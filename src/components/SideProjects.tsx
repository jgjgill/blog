import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import * as S from './SideProjects.styles'

interface Project {
  name: string
  url: string
  description: string
}

const projects: Project[] = [
  {
    name: 'my-speak',
    url: 'https://my-speak.com/',
    description: '외국어 말하기 실력을 빠르게 향상시키는 4단계 학습 앱',
  },
  {
    name: 'gs-i18n',
    url: 'https://jgjgill.github.io/gs-i18n/',
    description: 'Google Sheets와 i18next를 활용한 다국어 관리 CLI 도구',
  },
  {
    name: 'profile-readme-generator',
    url: 'https://www.profile-readme.store/',
    description: 'GitHub 프로필 README 템플릿 생성 서비스',
  },
]

const ProjectIcon = ({ projectName }: { projectName: string }) => {
  switch (projectName) {
    case 'my-speak':
      return (
        <StaticImage
          src="../images/my-speak-thumbnail.png"
          alt="my-speak icon"
          width={64}
          height={64}
          placeholder="blurred"
        />
      )
    case 'gs-i18n':
      return (
        <StaticImage
          src="../images/gs-i18n-thumbnail.png"
          alt="gs-i18n icon"
          width={64}
          height={64}
          placeholder="blurred"
        />
      )
    case 'profile-readme-generator':
      return (
        <StaticImage
          src="../images/profile-readme-generator-thumbnail.png"
          alt="profile-readme-generator icon"
          width={64}
          height={64}
          placeholder="blurred"
        />
      )
    default:
      return null
  }
}

const SideProjects = () => {
  return (
    <S.Container>
      <S.Title>Side Projects</S.Title>

      <S.ProjectGrid>
        {projects.map((project) => (
          <S.ProjectCard
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <S.ProjectIconWrapper>
              <ProjectIcon projectName={project.name} />
            </S.ProjectIconWrapper>
            <S.ProjectContent>
              <S.ProjectName>{project.name}</S.ProjectName>
              <S.ProjectDescription>{project.description}</S.ProjectDescription>
            </S.ProjectContent>
            <S.ArrowIcon className="arrow">→</S.ArrowIcon>
          </S.ProjectCard>
        ))}
      </S.ProjectGrid>
    </S.Container>
  )
}

export default SideProjects
