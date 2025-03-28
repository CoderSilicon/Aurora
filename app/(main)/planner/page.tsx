"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarPlus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, isWithinInterval, startOfDay, addDays } from "date-fns";

interface Planner {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY";
  events: Event[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
}

export default function PlannersPage() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [planners, setPlanners] = useState<Planner[]>([]);
  const [newPlannerTitle, setNewPlannerTitle] = useState("");
  const [newPlannerType, setNewPlannerType] = useState<
    "DAILY" | "WEEKLY" | "MONTHLY"
  >("DAILY");
  const [newPlannerStartDate, setNewPlannerStartDate] = useState<Date>(
    new Date()
  );
  const [newPlannerEndDate, setNewPlannerEndDate] = useState<Date>(
    addDays(new Date(), 7)
  );
  const [filterType, setFilterType] = useState<
    "all" | "active" | "upcoming" | "past"
  >("active");

  useEffect(() => {
    if (isSignedIn) {
      fetchPlanners();
    }
  }, [isSignedIn]);

  const fetchPlanners = async () => {
    const response = await fetch("/api/planners");
    const data = await response.json();
    setPlanners(data);
  };

  const createPlanner = async () => {
    const response = await fetch("/api/planners", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newPlannerTitle,
        startDate: newPlannerStartDate,
        endDate: newPlannerEndDate,
        type: newPlannerType,
      }),
    });

    if (response.ok) {
      setNewPlannerTitle("");
      fetchPlanners();
    }
  };

  const getFilteredPlanners = () => {
    const today = startOfDay(new Date());

    return planners.filter((planner) => {
      const startDate = new Date(planner.startDate);
      const endDate = planner.endDate
        ? new Date(planner.endDate)
        : addDays(startDate, 30);

      switch (filterType) {
        case "active":
          return isWithinInterval(today, { start: startDate, end: endDate });
        case "upcoming":
          return startDate > today;
        case "past":
          return endDate < today;
        default:
          return true;
      }
    });
  };

  const filteredPlanners = getFilteredPlanners();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100">
            Planner Dashboard
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
              >
                <CalendarPlus className="mr-2 h-5 w-5" />
                Create New Planner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/20">
              <DialogHeader>
                <DialogTitle className="text-amber-900 dark:text-amber-100">
                  Create New Planner
                </DialogTitle>
                <DialogDescription className="text-amber-600 dark:text-amber-400">
                  Set up your new planner with a title and date range.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="title"
                    className="text-amber-900 dark:text-amber-100"
                  >
                    Planner Title
                  </Label>
                  <Input
                    id="title"
                    value={newPlannerTitle}
                    onChange={(e) => setNewPlannerTitle(e.target.value)}
                    placeholder="My Planner"
                    className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="type"
                    className="text-amber-900 dark:text-amber-100"
                  >
                    Planner Type
                  </Label>
                  <Select
                    value={newPlannerType}
                    onValueChange={(value: "DAILY" | "WEEKLY" | "MONTHLY") =>
                      setNewPlannerType(value)
                    }
                  >
                    <SelectTrigger className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={createPlanner}
                  className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                >
                  Create Planner
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2 mb-6">
          {["all", "active", "upcoming", "past"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              onClick={() => setFilterType(type as typeof filterType)}
              className={
                filterType === type
                  ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  : "border-amber-200 text-amber-600 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
              }
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlanners.map((planner) => (
          <Card
            key={planner.id}
            className="cursor-pointer transition-all hover:shadow-lg border-amber-100 dark:border-amber-900/20 bg-white dark:bg-slate-900"
            onClick={() => router.push(`/planners/${planner.id}`)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-amber-900 dark:text-amber-100">
                  {planner.title}
                </CardTitle>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                  {planner.type.toLowerCase()}
                </span>
              </div>
              <CardDescription className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <CalendarIcon className="h-4 w-4" />
                {format(new Date(planner.startDate), "PPP")} -{" "}
                {planner.endDate
                  ? format(new Date(planner.endDate), "PPP")
                  : "Ongoing"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planner.events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20"
                  >
                    <div>
                      <p className="font-medium text-amber-900 dark:text-amber-100">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <Clock className="h-4 w-4" />
                        {format(new Date(event.startTime), "PPp")}
                      </div>
                    </div>
                  </div>
                ))}
                {planner.events.length > 3 && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 text-center pt-2">
                    +{planner.events.length - 3} more events
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
