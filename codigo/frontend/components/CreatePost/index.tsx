import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import { flushSync } from "react-dom";
import Input from "../Input";
import CloseIcon from '@mui/icons-material/Close'
import Button from "../Button";
import PostService from "@/services/post";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type Props = {
  submit: Function;
}

type Data = {
  content: string;
  tags: string[]
}

const CreatePost: React.FC<Props> = ({ submit }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Data>({
    content: "",
    tags: []
  });
  const [tag, setTag] = useState("")
  //Text lenght limiter
  const maxLength = 500;
  const [disableCreate, setDisableCreate] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, content: event.target.value });
  };

  const addTag = (e: any) => {
    e.preventDefault()
    if (tag) {
      if (data.tags) {
        setData({ ...data, tags: [...data.tags, tag] })
      }
      else {
        setData({ ...data, tags: [tag] })
      }
    }
    setTag('')
  }

  const removeTag = (index: number) => {
    if (index === -1) {
      setData({ ...data, tags: [] })
    }
    else {
      flushSync(() => {
        let newTags = [...data.tags]
        newTags = newTags.filter((_: any, i: number) => i !== index)
        setData({ ...data, tags: newTags })
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await PostService.create(data)


    if (response) {
      setLoading(false)
      toast.success('Post created successfully!')
      setTimeout(() => {
        router.reload()
      }, 2000)
    }
    else {
      toast.error("Error to create the post")
    }
  }

  return (
    <div className={styles.createPost}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Grid> */}
        <Row className={styles.row}>
          <Col xs={12}>
            <p className={styles.subtitle}>
              Share your recommendations with the community!
            </p>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col xs={12}>
            <div className={styles.inputGroup}>
              <div className={styles.postTitleCounter}>
                <label>Post Content*</label>
                <h5>{
                  data.content.length
                }/{maxLength}</h5>
              </div>
              <textarea
                placeholder="Share a link to a website, video, podcast..."
                {...register("content", { required: true, maxLength: 2000 })}
                required
              />
              {errors.content && <span style={{ color: 'red' }}> This field is required</span>}
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col xs={12}>
            <div className={styles.inputGroup}>
              <label>Add Image</label>
              <input
                className={styles.fileUpload}
                type="file"
                aria-required="true"
                {...register("image")}
              />
            </div>
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col xs={12}>
            <div className={styles.inputGroup}>
              <label>Tags*</label>
              <input
                placeholder={"Enter new tag"}
                type={"text"}
                {...register("tags", { required: true })}
              />
              {errors.tags && <span style={{ color: 'red' }}>This field is required</span>}
            </div>

            {
              data.tags &&
              <div className={styles.tagsContainer}>
                {
                  data.tags.map((tag: any, index: number) => {
                    return (
                      <>
                        <div className={styles.tag} key={`${tag}-${index}`}>
                          {tag}
                          <div className={styles.removeIcon} onClick={() => removeTag(index)}>
                            <CloseIcon />
                          </div>
                        </div>
                      </>

                    )
                  })
                }
                {
                  data.tags.length > 0 &&
                  <div className={styles.tagRemove} onClick={() => removeTag(-1)}>Clear all</div>
                }
              </div>
            }
          </Col>
        </Row>
        <Row className={styles.row}>
          <Col xs={12}>
            <div className={styles.createContainer}>
              <Button tp="default" text="Create" size="medium" type="submit" onClick={() => { }} />
            </div>
          </Col>
        </Row>
        {/* </Grid> */}
      </form>
    </div>

  );
};

export default CreatePost;
