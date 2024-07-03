import { createFileRoute } from "@tanstack/react-router";
import CounterCards from "./-CounterCards";
import RenderBasedOnRole from "../-RenderBasedOnRole";
import { useCounterMngmtStore } from "@/stores/admin/counterMgmt";
import { useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { useCounters } from "@/api/countermngmt";
import { isEmpty } from "radash";
import LoadingScreen from "./components/-LoadingScreen";
import ErrorScreen from "./components/-ErrorScreen";

export const Route = createFileRoute("/admin/counter-management/")({
  component: () => <CounterManagement />,
});

function CounterManagement() {
  const {
    toggleEditing,
    resetEditing,
    editing,
    duplicateArray,
    setDuplicateArray,
  } = useCounterMngmtStore();

  useEffect(() => {
    resetEditing();
  }, []);
  const { data: counters, error, isLoading } = useCounters();
  console.log(counters);

  // const toggleEditing = useCounterMngmtStore((state) => state.toggleEditing);
  const Admin = (
    <div className=" flex  flex-col size-full overflow-hidden mb-0.5">
      <div className="flex justify-end h-24 my-5">
        <div className="flex items-center justify-end ">
          {!editing ? (
            <button
              disabled={!!!counters}
              onClick={() => {
                toggleEditing();
                setDuplicateArray(counters?.content!);
              }}
              className=" flex flex-row items-center justify-center h-8 px-5 text-white rounded-sm bg-main_primary mr-9 "
            >
              <div className="flex flex-row items-center gap-3">
                {<p>Edit Counter</p>}
              </div>
            </button>
          ) : (
            <div className="flex flex-row ">
              <button
                onClick={() => {
                  toggleEditing();
                }}
                className="flex flex-row items-center justify-center h-8 px-5 text-main_primary rounded-sm bg-main_secondary mr-4 "
              >
                <div className="flex flex-row items-center">
                  {<p>Discard changes</p>}
                </div>
              </button>
              <button
                onClick={() => {
                  toggleEditing();
                }}
                className="flex flex-row items-center justify-center h-8 px-5 text-white rounded-sm bg-main_primary mr-9 "
              >
                <div className="flex flex-row items-center">
                  {<p>Save changes</p>}
                </div>
              </button>
            </div>
          )}

          {/* <AddEmployee /> */}
        </div>
      </div>

      <div className="pb-8 overflow-y-scroll pt-4">
        {/* <div className="grid lg:grid-cols-3 lg:px-10 lg:gap-10 xl:gap-x-10 1500:grid-cols-4 1800:grid-cols-5 4k:flex 4k:flex-wrap place-items-center "> */}
        <div className="grid  lg:grid-cols-auto-fill-200 xl:grid-cols-auto-fill-250 gap-x-5 gap-y-5 px-10">
          {isLoading
            ? LoadingScreen()
            : error
              ? ErrorScreen()
              : !editing
                ? counters?.content.map((counter) => {
                    return (
                      <CounterCards
                        key={counter.id}
                        counterName={counter.name}
                        userName={
                          counter.currentUser
                            ? counter.currentUser.username
                            : "Empty"
                        }
                        email={
                          counter.currentUser
                            ? counter.currentUser.email
                            : "Empty"
                        }
                        counterType={counter.counterType}
                        isAvailable={isEmpty(counter.currentUser)}
                      />
                    );
                  })
                : duplicateArray?.map((counter) => {
                    return (
                      <div>
                        <div className="relative">
                          <button className="bg-red-500 size-5 rounded-full absolute -right-2 -top-3 flex justify-center items-center">
                            <Minus className="text-white" size={15} />
                          </button>
                        </div>
                        <CounterCards
                          key={counter.id}
                          counterName={counter.name}
                          userName={
                            counter.currentUser
                              ? counter.currentUser.username
                              : "Empty"
                          }
                          email={
                            counter.currentUser
                              ? counter.currentUser.email
                              : "Empty"
                          }
                          counterType={counter.counterType}
                          isAvailable={isEmpty(counter.currentUser)}
                        />
                      </div>
                    );
                  })}

          {/* {!editing
            ? countertypes.map((counterType) => {
                return (
                  <CounterCards
                    key={counterType.counterId}
                    counterId={counterType.counterId}
                    counterName={counterType.counterName}
                    userName={counterType.userName}
                    status={counterType.status}
                    position={counterType.position}
                    email={counterType.email}
                    managed={counterType.managed}
                  />
                );
              })
            : duplicateArray.map((duplicateCounter) => (
                <div>
                  <div className="relative">
                    <button className="bg-red-500 size-5 rounded-full absolute -right-2 -top-3 flex justify-center items-center">
                      <Minus className="text-white" size={15} />
                    </button>
                  </div>
                  <CounterCards
                    key={duplicateCounter.counterId}
                    counterId={duplicateCounter.counterId}
                    counterName={duplicateCounter.counterName}
                    userName={duplicateCounter.userName}
                    status={duplicateCounter.status}
                    position={duplicateCounter.position}
                    email={duplicateCounter.email}
                    managed={duplicateCounter.managed}
                  />
                </div>
              ))} */}
          {editing && (
            <button>
              <div className="relative">
                <button className="bg-green-500 size-5 rounded-full absolute -right-2 -top-3 flex justify-center items-center z-50">
                  <Plus className="text-white" size={15} />
                </button>
              </div>
              <div className="flex flex-col lg:h-72 w-full rounded-xl py-5 border-gray-400 border-dashed border-2 justify-center items-center font-semibold text-center text-2xl opacity-50">
                <p>
                  ADD <br /> COUNTER
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return <RenderBasedOnRole adminComponent={Admin} />;
}

{
  /* 

{editing ? (
  {is}oading ? show loading screen 
    : error ? show error screen 
    : counters.map(() => show counters)}
) : (
  
  
  
)} */
}
