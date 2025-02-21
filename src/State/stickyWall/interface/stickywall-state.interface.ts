import { stickywallItem } from './get-stickywall.interface';
export interface StickyWallIntialState {
    stickyWalls: stickywallItem[];
    isLoading: boolean;
    error: string | null;
}