import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import TaskList from "../tasklist/TaskList";
import AddTask from "../tasklist/AddTask";
import { CalendarCheck } from "lucide-react";

export function TaskManagement() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="absolute p-6  flex gap-2 right-4 bottom-4"
          >
            <CalendarCheck />
            <p className="text-xl">Tasks</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Task Management</DialogTitle>
            <DialogDescription>
              You can add, edit and delete tasks here.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[calc(100svh-200px)]  ">
            <div className="overflow-auto h-[calc(100svh-450px)]">
              <TaskList />
            </div>
            <AddTask />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="absolute p-6  flex gap-2 right-4 bottom-4"
        >
          <CalendarCheck />
          <p className="text-xl">Tasks</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Task Management</DrawerTitle>
          <DrawerDescription>
            You can add, edit and delete tasks here.
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-[calc(100svh-450px)]  p-2 overflow-auto">
          <div>
            <TaskList />
          </div>
        </div>
        <DrawerFooter className="pt-1">
          <AddTask />
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
