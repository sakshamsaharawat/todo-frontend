export interface stickywallItem {
    _id: string;
    user_id: string;
    title: string;
    color_code: string;
    description: string;
    isDeleted: string;
    createdAt: string;
    updatedAt: string
}

export interface StickyWallResponse {
    data: stickywallItem[]
}