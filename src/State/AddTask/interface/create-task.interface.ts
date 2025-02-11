import { ListItem } from "../../List/interface/get-list.interface"
import { TagItem } from "../../Tag/interface/get-tag.interface"

export interface TaskData {
    title: string
    description: string
    due_date: string
    tag_ids: string[]
    list_id: string
    tags: TagItem[]
    list?: ListItem
}
