"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectTrigger = SelectPrimitive.Trigger
const SelectContent = SelectPrimitive.Content
const SelectItem = SelectPrimitive.Item

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} 