"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  BrainCircuit,
  Calendar,
  CheckSquare,
  ChevronDown,
  FileText,
  LayoutDashboard,
  ListTodo,
  Menu,
  Network,
  Plus,
  Search,
  Settings,
  Star,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-amber-50/30 dark:bg-slate-950">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-slate-900 border-r border-amber-100 dark:border-amber-900/20 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-amber-100 dark:border-amber-900/20">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center w-full"}`}
          >
            <BrainCircuit className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            {sidebarOpen && (
              <span className="font-bold text-amber-900 dark:text-amber-100">
                Vector Mind
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`${!sidebarOpen && "hidden"} text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20`}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 py-4 overflow-auto">
          <div className="space-y-1 px-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
              >
                <LayoutDashboard className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                {sidebarOpen && <span>Dashboard</span>}
              </Button>
            </Link>
            <Link href="/journals">
              <Button
                variant="ghost"
                className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
              >
                <BookOpen className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                {sidebarOpen && <span>Journals</span>}
              </Button>
            </Link>
            <Link href="/mind-maps">
              <Button
                variant="ghost"
                className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
              >
                <Network className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                {sidebarOpen && <span>Mind Maps</span>}
              </Button>
            </Link>
            <Link href="/tasks">
              <Button
                variant="ghost"
                className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
              >
                <CheckSquare className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                {sidebarOpen && <span>Tasks</span>}
              </Button>
            </Link>
            <Link href="/todos">
              <Button
                variant="ghost"
                className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
              >
                <ListTodo className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                {sidebarOpen && <span>Todos</span>}
              </Button>
            </Link>
          </div>

          {sidebarOpen && (
            <>
              <Separator className="my-4 bg-amber-100 dark:bg-amber-900/20" />
              <div className="px-4">
                <h3 className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  RECENT
                </h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 h-auto py-2"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm">Project Brainstorm</span>
                      <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                        Mind Map • 2 days ago
                      </span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 h-auto py-2"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm">Weekly Reflection</span>
                      <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                        Journal • 3 days ago
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-4 border-t border-amber-100 dark:border-amber-900/20">
          <Button
            variant="ghost"
            className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
          >
            <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
            {sidebarOpen && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-amber-900 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/20 ${!sidebarOpen && "justify-center px-2"}`}
          >
            <User className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
            {sidebarOpen && <span>Profile</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-amber-100 dark:border-amber-900/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-600/70 dark:text-amber-400/70" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-64 bg-amber-50 dark:bg-slate-800 border-amber-100 dark:border-amber-900/20 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20"
              >
                <Calendar className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                  >
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
                      <Bell className="h-5 w-5" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="p-2">
                    <h3 className="font-medium text-amber-900 dark:text-amber-100">
                      Notifications
                    </h3>
                  </div>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      Task reminder
                    </div>
                    <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
                      Complete "Project Outline" by today
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      Journal reminder
                    </div>
                    <div className="text-xs text-amber-600/70 dark:text-amber-400/70">
                      You haven't journaled today
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center text-amber-900 dark:text-amber-100 font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                Dashboard
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Create New{" "}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <BookOpen className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                    <span>New Journal</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Network className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                    <span>New Mind Map</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <CheckSquare className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                    <span>New Task</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <ListTodo className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
                    <span>New Todo</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-amber-100 dark:border-amber-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-900 dark:text-amber-100 text-lg">
                    Journals
                  </CardTitle>
                  <CardDescription className="text-amber-600/70 dark:text-amber-400/70">
                    Your recent journal entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Morning Reflection
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          Today, 8:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Weekly Goals
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          Yesterday, 7:15 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    View All Journals
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-amber-100 dark:border-amber-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-900 dark:text-amber-100 text-lg">
                    Mind Maps
                  </CardTitle>
                  <CardDescription className="text-amber-600/70 dark:text-amber-400/70">
                    Your recent mind maps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <Network className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Project Brainstorm
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          2 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <Network className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Book Concepts
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          1 week ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    View All Mind Maps
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-amber-100 dark:border-amber-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-900 dark:text-amber-100 text-lg">
                    Tasks & Todos
                  </CardTitle>
                  <CardDescription className="text-amber-600/70 dark:text-amber-400/70">
                    Your upcoming tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <CheckSquare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Complete Project Outline
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          Due today
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <ListTodo className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          Review Weekly Goals
                        </h4>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                          Due tomorrow
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-amber-300"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mb-8">
              <Tabs defaultValue="recent" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100">
                    Your Workspace
                  </h2>
                  <TabsList className="bg-amber-100 dark:bg-amber-900/50">
                    <TabsTrigger
                      value="recent"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-amber-900 dark:data-[state=active]:text-amber-100"
                    >
                      Recent
                    </TabsTrigger>
                    <TabsTrigger
                      value="favorites"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-amber-900 dark:data-[state=active]:text-amber-100"
                    >
                      Favorites
                    </TabsTrigger>
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-amber-900 dark:data-[state=active]:text-amber-100"
                    >
                      All
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recent" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Morning Reflection",
                        type: "Journal",
                        icon: FileText,
                        date: "Today",
                      },
                      {
                        title: "Project Brainstorm",
                        type: "Mind Map",
                        icon: Network,
                        date: "2 days ago",
                      },
                      {
                        title: "Weekly Goals",
                        type: "Journal",
                        icon: FileText,
                        date: "Yesterday",
                      },
                      {
                        title: "Shopping List",
                        type: "Todo",
                        icon: ListTodo,
                        date: "3 days ago",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer group"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-amber-600/50 dark:text-amber-400/50 hover:text-amber-600 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                          <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.type}
                            </span>
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="favorites" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Book Concepts",
                        type: "Mind Map",
                        icon: Network,
                        date: "1 week ago",
                      },
                      {
                        title: "Life Goals",
                        type: "Journal",
                        icon: FileText,
                        date: "2 weeks ago",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer group"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-amber-600 dark:text-amber-400"
                            >
                              <Star className="h-4 w-4 fill-amber-500" />
                            </Button>
                          </div>
                          <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.type}
                            </span>
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      {
                        title: "Morning Reflection",
                        type: "Journal",
                        icon: FileText,
                        date: "Today",
                      },
                      {
                        title: "Project Brainstorm",
                        type: "Mind Map",
                        icon: Network,
                        date: "2 days ago",
                      },
                      {
                        title: "Weekly Goals",
                        type: "Journal",
                        icon: FileText,
                        date: "Yesterday",
                      },
                      {
                        title: "Shopping List",
                        type: "Todo",
                        icon: ListTodo,
                        date: "3 days ago",
                      },
                      {
                        title: "Book Concepts",
                        type: "Mind Map",
                        icon: Network,
                        date: "1 week ago",
                      },
                      {
                        title: "Life Goals",
                        type: "Journal",
                        icon: FileText,
                        date: "2 weeks ago",
                      },
                      {
                        title: "Workout Plan",
                        type: "Task",
                        icon: CheckSquare,
                        date: "1 week ago",
                      },
                      {
                        title: "Reading List",
                        type: "Todo",
                        icon: ListTodo,
                        date: "2 weeks ago",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer group"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                              <item.icon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-amber-600/50 dark:text-amber-400/50 hover:text-amber-600 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </div>
                          <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.type}
                            </span>
                            <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
                              {item.date}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <BookOpen className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                    <h3 className="font-medium text-amber-900 dark:text-amber-100">
                      New Journal
                    </h3>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                      Capture your thoughts
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <Network className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                    <h3 className="font-medium text-amber-900 dark:text-amber-100">
                      New Mind Map
                    </h3>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                      Visualize your ideas
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <CheckSquare className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                    <h3 className="font-medium text-amber-900 dark:text-amber-100">
                      New Task
                    </h3>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                      Plan your projects
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-amber-100 dark:border-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
                    <ListTodo className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
                    <h3 className="font-medium text-amber-900 dark:text-amber-100">
                      New Todo
                    </h3>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                      Track your daily items
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Missing Bell component import
function Bell(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
