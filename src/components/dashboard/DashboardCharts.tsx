"use client";

import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
} from "recharts";

export default function DashboardCharts() {

    const [monthly,setMonthly]=useState<any[]>([]);
    const [funding,setFunding]=useState<any[]>([]);

    useEffect(()=>{

        async function load(){

            const res=await fetch("/api/dashboard");
            const data=await res.json();

            setMonthly(data.monthly || []);
            setFunding(data.funding || []);

        }

        load();

    },[]);

    return(

        <div className="grid lg:grid-cols-2 gap-8">

            <div className="rounded-xl border p-6 shadow-sm bg-white">

                <h2 className="text-xl font-bold mb-6">

                    Monthly Proposal Trend

                </h2>

                <div className="h-80">

                    <ResponsiveContainer>

                        <BarChart data={monthly}>

                            <XAxis dataKey="_id.month"/>

                            <YAxis/>

                            <Tooltip/>

                            <Legend/>

                            <Bar
                                dataKey="count"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="rounded-xl border p-6 shadow-sm bg-white">

                <h2 className="text-xl font-bold mb-6">

                    Funding Trend

                </h2>

                <div className="h-80">

                    <ResponsiveContainer>

                        <LineChart data={funding}>

                            <XAxis dataKey="_id.month"/>

                            <YAxis/>

                            <Tooltip/>

                            <Legend/>

                            <Line
                                dataKey="requested"
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}