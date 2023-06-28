import React, { useEffect, useState } from 'react'

import UserService from '@/services/user';
import { flushSync } from 'react-dom';
import { toast } from 'react-toastify';
import ProjectService from '@/services/project';

import styles from './styles.module.scss'
import Input from '../Input';
import CloseIcon from '@mui/icons-material/Close'
import Select from '../Select';
import Button from '../Button';
import { useRouter } from 'next/router';

type Props = {
  submit: Function;
}

const EditProject: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [disableEdit, setDisableEdit] = useState(true)
  const [tag, setTag] = useState('')
  const [area, setArea] = useState('')
  const [role, setRole] = useState('')

  const [areaOptions, setAreaOptions] = useState([
    {
      value: 'Technology',
      label: 'Technology'
    },
    {
      value: 'Design',
      label: 'Design'
    },
    {
      value: 'RH',
      label: 'RH'
    },
    {
      value: 'Commercial',
      label: 'Commercial'
    },
    {
      value: 'Marketing',
      label: 'Marketing'
    },
    {
      value: 'Shadowing',
      label: 'Shadowing'
    }
  ])

  const [usersOptions, setUsersOptions] = useState([
    {
      value: "1",
      label: "Thiago Pontes"
    },
    {
      value: "2",
      label: "Marina Duarte"
    },
    {
      value: "3",
      label: "Rafael Rodrigues"
    }
  ])

  const [file, setFile] = useState<any>(null)
  // const [data, setData] = useState<any>({
  //   name: "",
  //   description: "",
  //   tags: [],
  //   ownerId: "1",
  //   coleaderId: "",
  //   roles: [],
  //   badge: "",
  //   start: "",
  //   end: "",
  //   endSubscription: ""
  // })
  const [data, setData] = useState<any>(
    {
      name: "adasdas",
      description: "ASasA",
      tags: [
        "asA",
        "asad",
        "asda",
        "asd",
        "asd"
      ],
      ownerId: "1",
      coleaderId: "1",
      roles: [
        {
          area: "Technology",
          role: "asda",
          vacancies: 1
        }
      ],
      badge: "C:\\fakepath\\(1 - lambda)  (2 - lambda)  (3 - la.txt",
      start: "2131-03-12",
      end: "12321-03-12",
      endSubscription: "21321-03-12"
    }
  )

  const getProject = async (id: string) => {
    const response = await ProjectService.findByID(id);

    console.log(response)

    response.data.roles = JSON.parse(response.data.roles)
    response.data.tags = JSON.parse(response.data.tags)
    setData(response.data)
  }

  const editOptions = async () => {
    const response = await UserService.findAll()

    let options: any = []
    response.data.map((user: any) => {
      options.push({
        value: user.id,
        label: user.name
      })
    })

    console.log(response)
    setUsersOptions(options)
  }

  const addTag = (e: any) => {
    e.preventDefault()
    if (tag) {
      if (data.tags) {
        setData({ ...data, tags: [...data.tags, tag] })
      }
      else {
        setData({ ...data, tag: [tag] })
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

  // const [addedRoles, setAddedRoles] = useState<any>(null)

  const addRoles = (e?: any) => {
    if (e) {
      e.preventDefault()
    }

    console.log(data)

    console.log(e)
    if (area && role || area === "Shadowing") {
      flushSync(() => {
        if (!data.roles) {
          if (area === "Shadowing") {
            setRole("Shadowing")
            setData({
              ...data, roles: [{
                area: area,
                role: area,
                vacancies: 1
              }]
            })
          }
          else {
            setData({
              ...data, roles: [{
                area: area,
                role: role,
                vacancies: 1
              }]
            })
          }
        }
        else {
          let find = data.roles.some((el: any) => el.role == role)
          if (!find) {
            if (area === "Shadowing") {
              setRole("Shadowing")
              setData({
                ...data, roles: [...data.roles, {
                  area: area,
                  role: area,
                  vacancies: 1
                }]
              })
            }
            else {
              setData({
                ...data, roles: [...data.roles, {
                  area: area,
                  role: role,
                  vacancies: 1
                }]
              })
            }
          }
        }
      })
      setRole("")

      const element = document.getElementsByClassName(styles.addedRoles)[0]
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const updateRole = (value: number, index: number) => {
    let updatedRole = data.roles[index]
    updatedRole.vacancies = value
  }

  const removeRole = (index: number) => {
    flushSync(() => {
      let newRoles = [...data.roles]
      newRoles = newRoles.filter((_: any, i: number) => i !== index)
      setData({ ...data, roles: newRoles })
    })
  }

  const validateFields = () => {
    if (
      data.name &&
      data.description &&
      data.roles.length > 0 &&
      data.endSubscription &&
      data.start &&
      data.end &&
      data.badge
    ) {
      console.log(data)
      setDisableEdit(false)
    }
    else {
      setDisableEdit(true)
    }
  }

  const submit = async () => {
    setLoading(true)

    let response = await ProjectService.edit({
      name: data.name,
      description: data.description,
      tags: JSON.stringify(data.tags),
      roles: JSON.stringify(data.roles),
      start: new Date(data.start),
      end: new Date(data.end),
      badge: "",
      endSubscription: new Date(data.endSubscription),
      coleaderId: data.coleaderId,
    })
    console.log(response)

    if (response.status === 201) {
      setLoading(false)
      toast.success('Project editd successfully! Please check your email for more details.')
      setTimeout(() => {
        alert("Navega para a home")
      }, 2000)
    }
    else {
      toast.error("Error to edit the project")
    }
    console.log(response)
  }

  // useEffect(() => {
  //   const { id } = router.query
  //   if (id) {
  //     getProject(id[0])
  //   }
  // }, [])

  useEffect(() => {
    validateFields()
  }, [data, file])

  // useEffect(() => {
  //   editOptions()
  // }, [])

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <label>Project Name*</label>
        <Input
          size='large'
          placeholder={"Enter the project name"}
          type={"text"}
          value={data.name}
          onChange={(value: any) => setData({ ...data, name: value })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Project Description*</label>
        <Input
          size='large'
          placeholder={"Enter the project description"}
          type='text'
          value={data.description}
          onChange={(value: any) => setData({ ...data, description: value })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Tags</label>
        <form onSubmit={addTag}>
          <Input
            size='large'
            placeholder={"Enter new tag"}
            type={"text"}
            value={tag}
            autocomplete="off"
            onChange={(value: any) => setTag(value)}
          />
        </form>
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

      <div className={styles.inputContainer}>
        <label>Co-leader*</label>
        <Select options={usersOptions} size="large" showDefault default="Co-leader name" onChange={(value: string) => setData({ ...data, coleaderId: value })} />
      </div>

      <div className={styles.roleContainer}>
        <div className={styles.inputContainer}>
          <label>Area</label>
          <Select options={areaOptions} size="large" showDefault default="Vancancy area" onChange={(value: string) => setArea(value)} />
        </div>
        {/* 
        <div className={styles.inputContainer}>
          
        </div> */}

        <div className={styles.inputContainer}>
          <label>Role</label>

          <div className={styles.button}>
            <form onSubmit={addRoles}>
              {
                area == "Shadowing" ? (
                  <Input
                    disabled={true}
                    size='large'
                    placeholder={"e.g. DevOps"}
                    type={""}
                    value={role}
                    onChange={(role: any) => setRole(role)}
                  />
                ) :
                  <Input
                    size='large'
                    placeholder={"e.g. DevOps"}
                    value={role}
                    type={""}
                    onChange={(role: any) => setRole(role)}
                  />
              }
            </form>
            <Button type='button' tp='terceary' text='Add' size='small' onClick={() => addRoles()}></Button>
          </div>
        </div>

        {
          data.roles && data.roles.length > 0 && (
            <div className={styles.addedRoles}>
              <p className={styles.addedRolesTitle}>Roles / Vacancies</p>
              {
                data.roles.map((role: any, index: number) => {
                  return (
                    <div className={styles.addedRole} key={`${role.area}-${role.role}-${index}`}>
                      <div className={styles.addedRoleContainer}>
                        <div className={styles.area}>
                          <p className={styles.areaName}>{role.area}</p>
                        </div>
                        {
                          role.role !== 'Shadowing' &&
                          <div className={styles.role}>
                            <p className={styles.roleName}>{role.role}</p>
                          </div>
                        }
                      </div>
                      <div className={styles.vacancies}>
                        <Input type="number" value={role.vacancies} size="large" placeholder='0' onChange={(value: number) => updateRole(value, index)} />
                      </div>
                      <div className={styles.removeRole} onClick={() => removeRole(index)}>
                        <CloseIcon />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>

      <div className={styles.inputContainer}>
        <label>End of subscription*</label>
        <Input
          size='large'
          placeholder={"xx/xx/xxxx"}
          type={"date"}
          value={data.endSubscription}
          onChange={(value: any) => setData({ ...data, endSubscription: value })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Import badge*</label>
        <Input
          size='large'
          placeholder='file'
          type={"file"}
          onChange={(value: any) => setData({ ...data, badge: value })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Project start*</label>
        <Input
          size='large'
          placeholder={"xx/xx/xxxx"}
          type={"date"}
          value={data.start}
          onChange={(value: any) => setData({ ...data, start: value })}
        />
      </div>

      <div className={styles.inputContainer}>
        <label>Project end*</label>
        <Input
          size='large'
          placeholder={"xx/xx/xxxx"}
          type={"date"}
          value={data.end}
          onChange={(value: any) => setData({ ...data, end: value })}
        />
      </div>

      <div className={styles.editContainer}>
        <Button type='button' tp="default" text="Save" size="medium" disabled={disableEdit} onClick={() => submit()} />
      </div>
    </div >
  )
}

export default EditProject