"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, ArrowLeft, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
}

interface Planner {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  events: Event[];
}

export default function PlannerPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [planner, setPlanner] = useState<Planner | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");

  useEffect(() => {
    if (session && params.id) {
      fetchPlanner();
    }
  }, [session, params.id]);

  const fetchPlanner = async () => {
    const response = await fetch(`/api/planners/${params.id}`);
    if (response.ok) {
      const data = await response.json();
      setPlanner(data);
    }
  };

  const createEvent = async () => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newEventTitle,
        description: newEventDescription,
        startTime: selectedDate,
        endTime: selectedDate,
        plannerId: params.id,
      }),
    });

    if (response.ok) {
      setNewEventTitle("");
      setNewEventDescription("");
      fetchPlanner();
    }
  };

  if (!planner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-6 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-900/20"
        onClick={() => router.push("/planners")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Planners
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">
                  {planner.title}
                </CardTitle>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                  {planner.type.toLowerCase()}
                </span>
              </div>
              <CardDescription className="text-amber-600 dark:text-amber-400">
                {format(new Date(planner.startDate), "PPP")} -{" "}
                {planner.endDate
                  ? format(new Date(planner.endDate), "PPP")
                  : "Ongoing"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planner.events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-amber-900 dark:text-amber-100">
                        {event.title}
                      </h3>
                      {event.isCompleted && (
                        <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(event.startTime), "PPp")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8 bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/20">
            <CardHeader>
              <CardTitle className="text-amber-900 dark:text-amber-100">
                Add New Event
              </CardTitle>
              <CardDescription className="text-amber-600 dark:text-amber-400">
                Schedule a new event for your planner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border border-amber-100 dark:border-amber-900/20"
                />

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="eventTitle"
                      className="text-amber-900 dark:text-amber-100"
                    >
                      Event Title
                    </Label>
                    <Input
                      id="eventTitle"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="Enter event title"
                      className="mt-1.5 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="eventDescription"
                      className="text-amber-900 dark:text-amber-100"
                    >
                      Description
                    </Label>
                    <Input
                      id="eventDescription"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      placeholder="Enter event description"
                      className="mt-1.5 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                    />
                  </div>
                  <Button
                    onClick={createEvent}
                    className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  >
                    Add Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
