import { stickywallItem } from "../../stickyWall/interface/get-stickywall.interface";

export type InitialState = {
    tags: stickywallItem[];
    isLoading: boolean;
    error: string | null;
};