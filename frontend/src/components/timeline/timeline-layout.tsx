"use client";

import React from "react";
import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
} from "@/components/timeline/timeline";



interface Timeline {
	id: string;
	title: string;
	date: string;
	description: string;
}

interface TimelineLayoutProps {
	timelines: Timeline[];
}

export const TimelineLayout = ({ timelines } : TimelineLayoutProps) => {
	return (
			<Timeline>
				{timelines.map((timeline: Timeline) => (
					<TimelineItem key={timeline.id}>
						<TimelineConnector />
							<TimelineHeader>
								<TimelineTime>{timeline.date}</TimelineTime>
								<TimelineIcon />
								<TimelineTitle>{timeline.title}</TimelineTitle>
							</TimelineHeader>
							<TimelineContent>
								<TimelineDescription>{timeline.description}</TimelineDescription>
							</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
	);
};