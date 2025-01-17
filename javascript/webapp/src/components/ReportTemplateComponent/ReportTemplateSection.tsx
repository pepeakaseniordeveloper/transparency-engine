/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { memo } from 'react'
import { When } from 'react-if'

import {
	SectionContainer,
	SectionDescription,
	SectionTitle,
} from '../../styles/reports.js'
import type {
	AttributeBlock,
	ComplexTableAttribute,
	GraphData,
	ReportSection,
	TableAttribute,
} from '../../types.js'
import { FormatType } from '../../types.js'
import { ChartComponent } from '../ChartComponent/ChartComponent.js'
import { ComplexTableComponent } from '../ComplexTableComponent/ComplexTableComponent.js'
import { TableComponent } from '../TableComponent/TableComponent.js'

export interface ReportTemplateSectionProps {
	section: ReportSection
	relatedGraphs: Map<string, GraphData>
}

// eslint can't pick up the logical assertions in the When conditions
/*eslint-disable @typescript-eslint/no-non-null-assertion*/
export const ReportTemplateSection: React.FC<ReportTemplateSectionProps> = memo(
	function ReportTemplateSection({ section, relatedGraphs }) {
		const { attribute_mapping } = section
		return (
			<SectionContainer>
				<When condition={section.title !== undefined}>
					<SectionTitle>{section.title!}</SectionTitle>
				</When>

				<When condition={section.intro !== undefined}>
					<SectionDescription>{section.intro!}</SectionDescription>
				</When>

				<When
					condition={
						attribute_mapping.attribute_counts !== undefined &&
						attribute_mapping.attribute_counts.format === FormatType.Table
					}
				>
					<TableComponent dataObject={attribute_mapping.attribute_counts!} />
				</When>

				<When condition={attribute_mapping.attribute_values !== undefined}>
					<When
						condition={
							attribute_mapping.attribute_values?.format === FormatType.Table
						}
					>
						<TableComponent
							dataObject={
								attribute_mapping.attribute_values as AttributeBlock<TableAttribute>
							}
						/>
					</When>
					<When
						condition={
							attribute_mapping.attribute_values?.format ===
							FormatType.ComplexTable
						}
					>
						<ComplexTableComponent
							dataObject={
								attribute_mapping.attribute_values as AttributeBlock<ComplexTableAttribute>
							}
							relatedGraphs={relatedGraphs}
						/>
					</When>
				</When>

				<When
					condition={
						attribute_mapping.attribute_charts !== undefined &&
						attribute_mapping.attribute_charts.format === FormatType.Chart
					}
				>
					<ChartComponent dataObject={attribute_mapping.attribute_charts!} />
				</When>
			</SectionContainer>
		)
	},
)
