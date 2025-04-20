import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";

const useSingleRepository = (id) => {
  const { data, loading, error } = useQuery(SINGLE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository
    ? {
        id: data.repository.id,
        fullName: data.repository.fullName,
        description: data.repository.description,
        language: data.repository.language,
        stargazersCount: data.repository.stargazersCount,
        forksCount: data.repository.forksCount,
        reviewCount: data.repository.reviewCount,
        ratingAverage: data.repository.ratingAverage,
        ownerAvatarUrl: data.repository.ownerAvatarUrl,
        url: data.repository.url,
        reviews: data.repository.reviews,
      }
    : null;

  return {
    repository,
    loading,
    error,
  };
};

export default useSingleRepository;
