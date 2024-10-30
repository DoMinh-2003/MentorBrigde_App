/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { ADMIN_API, TEAM_API } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "@/utils/getCurrentUser";
import useApi from "@/hooks/useApi";

const useStudentService = () => {
  const { callApi, loading, setIsLoading } = useApi();
  const dispatch = useDispatch();
  const user = useCurrentUser();

  const getUserTeam = useCallback(
    async (teamCode?: string) => {
      try {
        setIsLoading(true);
        // check PATH
        const PATH = teamCode ? TEAM_API.TEAM + teamCode : TEAM_API.TEAM;
        const response = await callApi("get", PATH);
        return response?.data;
      } catch (e: any) {
        console.error("Fetch User Team Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  //   const createTeam = useCallback(async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await callApi("post", TEAM_API.TEAM);
  //       const newUser = { ...user, teamCode: response.data.code };
  //       dispatch(loginRedux(newUser));
  //       toast.success("Tạo team thành công");
  //       await getUserTeam();
  //       return response?.data;
  //     } catch (e: any) {
  //       console.error("Create Team Error: ", e);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, [callApi, user, dispatch, getUserTeam]);

  const searchTeamMembers = useCallback(
    async (searchTerm: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "get",
          `${ADMIN_API.ADMIN}?search=${searchTerm}&role=STUDENT`
        );
        return response?.data;
      } catch (e: any) {
        console.error("Search Team Members Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const inviteToGroup = useCallback(
    async (email: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "post",
          `http://103.200.20.149:8080/api/team/invite?email=${email}&teamCode=${user?.teamCode}`
        );

        return response?.data;
      } catch (e: any) {
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  const acceptInvitation = useCallback(
    async (token: string, teamCode: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `accept-invitation?token=${token}&teamCode=${teamCode}`
        );
        return response?.message;
      } catch (e: any) {
        console.error("Invite to Group Error: ", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  return {
    loading,
    // createTeam,
    getUserTeam,
    searchTeamMembers,
    inviteToGroup,
    acceptInvitation,
  };
};

export default useStudentService;