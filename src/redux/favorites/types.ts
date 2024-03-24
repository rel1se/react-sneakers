export type FavoriteItem = {
    id: number;
    parentId: number;
    title: string;
    price: number;
    imageUrl: string;
}

export interface FavoriteSliceState {
    favoriteItems: FavoriteItem[];
    status: string;
    error: unknown;
}