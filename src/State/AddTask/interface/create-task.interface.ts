import { ListItem } from "../../List/interface/get-list.interface"
import { TagItem } from "../../Tag/interface/get-tag.interface"

export interface TaskData {
    title: string
    description: string
    due_date: string
    tag_ids: string[] | TagItem[],
    list_id: string  | ListItem,
    tags: TagItem[],
    list: ListItem
}
