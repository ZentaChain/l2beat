import React, { ReactNode } from 'react'

import { cn } from '../../utils/cn'
import { ProjectSectionId } from './sectionId'
import { UnderReviewCallout } from './UnderReviewCallout'

interface Props {
  title: string
  id: ProjectSectionId
  className?: string
  children: ReactNode
  isUnderReview?: boolean
}

export function ProjectDetailsSection(props: Props) {
  return (
    <section id={props.id} className={cn(props.className, 'mt-10 md:mt-16')}>
      <h2 className="mb-6 text-2xl font-bold md:text-4xl md:leading-normal">
        <a href={`#${props.id}`}>{props.title}</a>
      </h2>
      {props.isUnderReview ? <UnderReviewCallout /> : props.children}
    </section>
  )
}
