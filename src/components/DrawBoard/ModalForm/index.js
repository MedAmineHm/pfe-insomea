import PropTypes from "prop-types";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { split } from "ramda";
import LocationForm from "./LocationForm";
import ResourcegroupForm from "./ResourcegroupForm";
import VirtualnetworkForm from "./VirtualnetworkFrom";
import SubnetForm from "./SubnetForm";

const ModalForm = ({ setOpenModal, openModal, nodes }) => {
  const form = useForm({
    mode: "uncontrolled",
  });

  const targetNode = nodes.find((node) => node.id === openModal);

  const handleSwitchForm = (node, Props) => {
    switch (split("_", node.id)[0]) {
      case "location": {
        return <LocationForm {...Props} />;
      }
      case "resourcegroup": {
        return <ResourcegroupForm {...Props} />;
      }
      case "vnet": {
        return <VirtualnetworkForm {...Props} />;
      }
      case "subnet": {
        return <SubnetForm {...Props} />;
      }

      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Modal
        opened={!!openModal}
        onClose={() => setOpenModal(null)}
        title="boardForm"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          {nodes.map((node) => {
            const Props = {
              nodeId: node.id,
              form,
              label: node.label,
            };

            const containerProps = {
              nodeId: node.id,
              targetNode,
            };
            return (
              <FormContainer key={node.id} {...containerProps}>
                {handleSwitchForm(node, Props)}
              </FormContainer>
            );
          })}
          <button type="submit">submit</button>
        </form>
      </Modal>
    </>
  );
};

const FormContainer = ({ children, nodeId, targetNode }) => (
  <div>
    <div
      style={{
        display: !targetNode?.referenceId?.includes(nodeId) ? "none" : "block",
      }}
    >
      {children}
    </div>
  </div>
);

ModalForm.propTypes = {
  nodes: PropTypes.array,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};

export default ModalForm;
