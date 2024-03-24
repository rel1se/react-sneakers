import {RootState} from "../store";
import {FavoriteItem} from "./types";

export const selectFavoriteItems = (state: RootState) => state.favorite.favoriteItems;
export const selectIsItemFavorite = (state: RootState, itemId: number) =>
    state.favorite.favoriteItems.some((item: FavoriteItem) => item.parentId === itemId);