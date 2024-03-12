import React from 'react';
import { useParams } from 'react-router-dom';

const SingleBlogPage = () => {
    const {blogId} = useParams()
    return (
        <div>
            Single Blog Page: {blogId}
        </div>
    );
};

export default SingleBlogPage;