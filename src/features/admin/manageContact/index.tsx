import styled from "./index.module.scss";
import TableManageContact from "./tableManageContact";
import { useAppSelector } from "@/store/index";

const ManageContact = () => {
  const contactList = useAppSelector(
    (state) => state.manageContact.contactList
  );
  const loading = useAppSelector((state) => state.manageContact.loading);
  const pagination = useAppSelector((state) => state.manageContact.pagination);
  const total = useAppSelector((state) => state.manageContact.total);

  return (
    <div className={styled["manage__contact"]}>
      <TableManageContact
        contactList={contactList}
        loading={loading}
        pagination={pagination}
        total={total}
      />
    </div>
  );
};

export default ManageContact;
