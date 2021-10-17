import type { Song } from "../Song"
import { Typography } from "../Typography"

export interface PlaylistProps {
    songs: Song[]
}
export const Playlist = () => {
    return(
        <>
        <Typography as="p" variant="body">Playlist for Today</Typography>
        </>
    )
}