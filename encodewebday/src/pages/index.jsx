import React from "react";
import DefaultLayout from "../layouts/default";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

const CheckmarkCircle02Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const CancelCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const sets = [
  { key: "Set 1", token: "R4A2C2" },
  { key: "Set 2", token: "H3C3D2" },
  { key: "Set 3", token: "I5E4B3" },
  { key: "Set 4", token: "L3A3F4" },
];
export default function IndexPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputToken, setInputToken] = React.useState("");
  const [selectedSet, setSelectedSet] = React.useState(null);
  const [inputIsRight, setInputIsRight] = React.useState(false);

  const changeInputValue = (value) => {
    setInputToken(value);
    setInputIsRight(findTokenByLabel(selectedSet) === value);
  }

  const findTokenByLabel = (key) => {
    const foundSet = sets.find(set => set.key === key);
    return foundSet ? foundSet.token : null;
  };

  const changeKeyDown = (event) => {
    if (event.key === "Enter") onOpen();
  }

  React.useEffect(() => { changeInputValue(inputToken) }, [selectedSet]);


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 h-[80%]">
        <div className="flex flex-col gap-4 sm:w-[30vw] w-[70vw]">

          <span className="text-3xl font-bold text-center">Enter your Token</span>

          <Select
            items={sets}
            aria-label="Select a set"
            placeholder="Select a Set"
            variant="faded"
            size="lg"
            onChange={(e) => setSelectedSet(e.target.value)}
            selectedKeys={[selectedSet]}
            listboxProps={{
              itemClasses: {
                base: [
                  "dark"
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "dark text-foreground",
              },
            }}>
            {(set) => <SelectItem>{set.key}</SelectItem>}
          </Select>

          <Input size="md" type="text" label="Enter Token" placeholder="ABCXYZ" variant="faded" onValueChange={changeInputValue} value={inputToken} onKeyDown={changeKeyDown} />

          <Button color="success" variant="shadow" onPress={onOpen}>
            Submit
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="w-fit px-[70px] dark text-foreground">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 items-center">{inputIsRight ? "Success!" : "Failure!"}</ModalHeader>
                  <ModalBody >
                    <div className="flex items-center flex-col gap-3">
                      {inputIsRight ?
                        <>
                          <CheckmarkCircle02Icon color="green" width="60" height="60" />
                          Token is Correct!
                        </>
                        :
                        <>
                          <CancelCircleIcon color="red" width="60" height="60" />
                          Token is Incorrect!
                        </>
                      }
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex w-full justify-center">
                      <Button color="danger" variant="light" size="sm" onPress={onClose}>
                        Close
                      </Button>
                    </div>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </section>
    </DefaultLayout>
  );
}