import React, { useEffect, useState } from "react";
import { Row } from 'react-styled-flexboxgrid'
import { ProjectCard } from "@/components/ProjectCard";
import { Layout } from "@/components/Layout";
import { Text } from "@/components/Text";
import ProjectService from "@/services/project";

import burguer from "@/assets/icons/burguer.png"
import star from "@/assets/icons/star.png"
import community from "@/assets/icons/community.png"

const myProjects = () => {

    const navigation = [
        {
            icon: burguer,
            text: 'All Projects',
            url: '/projects'
        },
        {
            icon: star,
            text: 'My Projects',
            url: '/projects/userId'
        },
        {
            icon: community,
            text: 'Apliccations',
            url: '/projects/application'
        }
    ]

    const [projects, setProjects] = useState<any>()

    const getAllProjects = async () => {
        const response = await ProjectService.filter({ownerId: localStorage.getItem("userId") || ''})
        setProjects(response.data)
    }

    useEffect(() => {
        getAllProjects()

    }, [])

    return (
        <Layout header={navigation} navbar={true} title="Projects" active={0}>
            <Row around="xs" center="sm">
                {
                    projects && projects.map((project: any, index: number) => {
                        try{
                            project.tags = JSON.parse(project.tags)
                        }
                        catch {}
                        return <ProjectCard data={project} key={index} />
                    })
                }
                {
                    projects && projects.length === 0 && <Text color="black">Sem projetos</Text>
                }
            </Row>
        </Layout>
    )
}

export default myProjects;