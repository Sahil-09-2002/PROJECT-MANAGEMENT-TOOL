/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchMembers, removeMember } from "../../context/members/actions";

import {
  useMembersState,
  useMembersDispatch,
} from "../../context/members/context";

export default function MemberListItems() {
  const dispatchMembers = useMembersDispatch();
  const state: any = useMembersState();
  const { members, isLoading, isError, errorMessage } = state;

  if (!members) {
    return <span>Loading...</span>;
  }

  const handleDelete = async (id: number) => {
    try {
      const result = await removeMember(dispatchMembers, id);

      if (result.ok) {
        await fetchMembers(dispatchMembers);
      } else {
        console.error("Error deleting member:", result.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  if (members.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {members.map((member: any) => (
        <div
          key={member.id}
          className={`member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            Name: {member.name}
          </h5>
          <h5 className="mb-2 text-x font-medium tracking-tight text-gray-500 dark:text-white">
            Email: {member.email}
          </h5>
          <button
            type="button"
            onClick={() => handleDelete(member.id)}
            className="delete-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
}
