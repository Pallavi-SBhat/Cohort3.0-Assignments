import { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Modal } from "@/components/Modal/Modal";

const ModalPage = () => {
  const [lightModal, setLightModal] = useState(false);
  const [darkModal, setDarkModal] = useState(false);
  const [outlineModal, setOutlineModal] = useState(false);

  const usageCode = `import { useState } from "react";
import { Button, Modal } from "@/components";

export default function App() {
  const [lightModal, setLightModal] = useState(false);
  const [darkModal, setDarkModal] = useState(false);
  const [outlineModal, setOutlineModal] = useState(false);

  return (
    <div>
      <Button className="mr-4" variant="primary" onClick={() => setLightModal(true)}>Light Modal</Button>
      <Modal variant="light" size="sm" isOpen={lightModal} onClose={() => setLightModal(false)}>
        <h2 className="text-lg font-semibold">Modal Title</h2>
        <p>This is modal content.</p>
      </Modal>

      <Button className="mr-4" variant="dark" onClick={() => setDarkModal(true)}>Dark Modal</Button>
      <Modal variant="dark" size="sm" isOpen={darkModal} onClose={() => setDarkModal(false)}>
        <h2 className="text-lg font-semibold">Modal Title</h2>
        <p>This is modal content.</p>
      </Modal>

      <Button variant="outline" onClick={() => setOutlineModal(true)}>Form Modal</Button>
      <Modal variant="outline" size="md" isOpen={outlineModal} onClose={() => setOutlineModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Your email" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOutlineModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOutlineModal(false)}>Submit</Button>
        </div>
      </Modal>
    </div>
  );
}`;

  const propsData = [
    {
      prop: "isOpen",
      type: "boolean",
      default: "false",
      description: "Controls modal visibility",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"light"',
      description: "The visual style variant of the Modal",
    },
    {
      prop: "onClose",
      type: "() => void",
      default: "-",
      description: "Callback when modal closes",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "Content inside the modal",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Modal</h1>
        <p className="text-xl" style={{ color: "var(--text-muted)" }}>
          The Modal component is used to display content in an overlay.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <Button
            className="mr-4"
            variant="primary"
            onClick={() => setLightModal(true)}
          >
            Light Modal
          </Button>
          <Modal
            variant="light"
            size="sm"
            isOpen={lightModal}
            onClose={() => setLightModal(false)}
          >
            <h2 className="text-lg font-semibold">Modal Title</h2>
            <p>This is modal content.</p>
          </Modal>

          <Button
            className="mr-4"
            variant="dark"
            onClick={() => setDarkModal(true)}
          >
            Dark Modal
          </Button>
          <Modal
            variant="dark"
            size="lg"
            isOpen={darkModal}
            onClose={() => setDarkModal(false)}
          >
            <h2 className="text-lg font-semibold">Modal Title</h2>
            <p>This is modal content.</p>
          </Modal>

          <Button variant="outline" onClick={() => setOutlineModal(true)}>
            Form Modal
          </Button>
          <Modal
            variant="outline"
            size="md"
            isOpen={outlineModal}
            onClose={() => setOutlineModal(false)}
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Your email" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setOutlineModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOutlineModal(false)}>Submit</Button>
            </div>
          </Modal>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default ModalPage;
