import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const { data, loading, fetchMore, error, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { orderBy, orderDirection, searchKeyword, first: 5 },
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    if (!loading && data?.repositories?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          orderBy,
          orderDirection,
          searchKeyword,
          after: data.repositories.pageInfo.endCursor,
          first: 5,
        },
      });
    }
  };

  const repositories = data?.repositories?.edges.map((edge) => edge.node) || [];

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;
