"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Search, Settings2, Star } from "lucide-react";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "./ui/combobox";
import { Genre } from "@/types";
import React from "react";

const votes = ["Any", "6.0", "7.0", "8.0", "9.0"];
const years = ["Any", "1990s", "2000s", "2010s", "2020s"];
const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

const FiltersDialog = ({ genres }: { genres: Genre[] }) => {
  const anchor = useComboboxAnchor();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-28 h-10">
          <Settings2 className="text-sidebar-primary-foreground" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        {/* Title */}
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        {/* Filters */}
        <div className="py-12 space-y-10">
          <div className="flex justify-between items-center gap-32">
            <Label className="text-xs text-muted-foreground font-bold ">
              VOTES
            </Label>
            <Select defaultValue="popularity">
              <SelectTrigger className="w-45">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="votes">Votes</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="release-date">Release Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* VOTES */}
          <div className="flex justify-between items-center gap-32">
            <Label className="text-xs text-muted-foreground font-bold ">
              VOTES
            </Label>
            <ToggleGroup
              type="single"
              defaultValue="Any"
              spacing={3}
              className="flex-1"
            >
              {votes.map((value) => (
                <ToggleGroupItem
                  value={value}
                  aria-label="Toggle"
                  className="flex-1"
                >
                  <Star className="size-3.5" /> {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex justify-between items-center gap-34">
            <Label className="text-xs text-muted-foreground font-bold">
              YEAR
            </Label>
            <ToggleGroup
              type="single"
              defaultValue="Any"
              spacing={3}
              className="flex-1"
            >
              {years.map((value) => (
                <ToggleGroupItem
                  value={value}
                  aria-label="Toggle"
                  className="flex-1"
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground font-bold">
              GENRES
            </Label>
            <Combobox
              multiple
              autoHighlight
              items={frameworks}
              defaultValue={[frameworks[0]]}
            >
              <ComboboxChips ref={anchor} className="w-full max-w-xs">
                <ComboboxValue>
                  {(values) => (
                    <React.Fragment>
                      {values.map((value: string) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput />
                    </React.Fragment>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
        <DialogFooter>
          {/* Actions */}
          <div className="flex justify-center gap-6 w-full">
            <Button size={"lg"} variant={"secondary"}>
              Reset All
            </Button>
            <Button size={"lg"}>Apply Filters</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
