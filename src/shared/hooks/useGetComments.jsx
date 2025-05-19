import { useState, useEffect } from "react";
import { getComments } from "../../services";

export const useCommentsByPublication = (publicationId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const response = await getComments();
                const allComments = response.comments || [];
                const filteredComments = allComments.filter(
                    (comment) => comment.publication && comment.publication._id === publicationId
                )
                setComments(filteredComments);
            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        if (publicationId) {
            fetchComments();
        }
    }, [publicationId]);

    return { comments, isLoading, error };
}
