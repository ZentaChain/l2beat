import React from 'react'

import { cn } from '../../utils/cn'
import { ChevronDownIcon, ProjectLink } from '../icons'
import { LinkSectionLink } from '../project/links/LinkSectionLink'

interface MobileProjectLinksProps {
  projectLinks: ProjectLink[]
}

export function MobileProjectLinks(props: MobileProjectLinksProps) {
  return (
    <div className="Dropdown">
      <label className="flex items-center justify-between py-4">
        <input
          type="checkbox"
          autoComplete="off"
          className="Dropdown-Button peer hidden"
        />
        <div>
          <span className="font-bold">Links:</span>
          <span className="ml-2 font-medium text-gray-600">
            Website, Docs, etc.
          </span>
        </div>
        <ChevronDownIcon className="transition-transform duration-300 peer-checked:-rotate-180" />
      </label>
      <div className="Dropdown-Item hidden">
        <table className="w-full table-fixed border-collapse text-left text-xs">
          <tbody>
            {props.projectLinks.map(({ name, links }, i) => (
              <tr
                className="border-t-[1px] border-gray-300 first:border-none dark:border-gray-850"
                key={i}
              >
                <th
                  className={cn(
                    'w-[110px] py-3 align-top font-medium text-gray-500 dark:text-gray-550',
                    i === 0 && 'pt-0',
                  )}
                >
                  {name}
                </th>
                <td className={cn('py-3', i === 0 && 'pt-0')}>
                  {links.map((x, i) => (
                    <LinkSectionLink key={i} href={x} name={name} />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
