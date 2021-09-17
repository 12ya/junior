import React, { useState } from 'react';

export const Bookmark = () => {
    const [bookmark, setBookmark] = useState(false);
    return (
        <>
            <td onClick={() => setBookmark(!bookmark)}>
                {bookmark ? (
                    <i class='bi bi-bookmark-fill'></i>
                ) : (
                    <i class='bi bi-bookmark'></i>
                )}
            </td>
        </>
    );
};
