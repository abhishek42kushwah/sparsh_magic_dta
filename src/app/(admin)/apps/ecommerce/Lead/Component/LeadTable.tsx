import  { useState } from 'react';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import type { LeadType } from '@/types/data';
import type { ColumnDef } from '@tanstack/react-table';
import {FormCheck, OverlayTrigger, Tooltip } from 'react-bootstrap';

import ViewActionListModal from './ViewActionLIstModal';
import AssignedModal from './AssignedModal';
import LeadStatusUpdateModal from './LeadStatusUpdateModal';
const LeadTable = ({ lead }: { lead: LeadType[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAgentsModal, setAgentsShowModal] = useState(false);
  const [showLeadStatusModal, setShowLeadStatusModal] = useState(false);

  const [selectedLead, setSelectedLead] = useState<LeadType | null>(null);
 
  const [assignLead, setAssignLead] = useState<LeadType | null>(null);

  const handleOpenModal = (lead: LeadType) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleModal = (lead: LeadType) => {
    setAssignLead(lead);
    setAgentsShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
   
    setAgentsShowModal(false)
    setShowLeadStatusModal(false)
    setSelectedLead(null);
  };

  const handleLeadStatus =()=>{
    setShowLeadStatusModal(true)
  }

  const columns: ColumnDef<LeadType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <FormCheck
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            const checked = e.target.checked;
            table.getRowModel().rows.forEach(row => {
              row.getToggleSelectedHandler()(checked);
            });
          }}
        />
      ),

      cell: ({
        row: {
          id,
          getIsSelected,
          getToggleSelectedHandler,
        },
      }) => (
        <div style={{ width: 16 }}>
          <FormCheck
            id={`checkbox-${id}`}
            checked={getIsSelected()}
            onChange={getToggleSelectedHandler()}
          />
        </div>
      ),
    },
  
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Mobile',
      accessorKey: 'mobile',
    },
    {
      header: 'Source',
      accessorKey: 'source',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Assigned To',
      accessorKey: 'agentName',
    },
    {
      header: 'CreateAt',
      cell: ({ row: { original } }) => (
          <span>
              {original.createAt.toDateString()},{original.createAt.toLocaleTimeString()}
          </span>
      ),
  },
    {
      id: 'action',
      header: () => <div className="text-end">Action</div>,
      cell: ({
        row: {
          original,
        },
      }) => (
        <div className="text-end w-100">

          <OverlayTrigger placement="top" overlay={<Tooltip id="view-ticket-tooltip">View Action</Tooltip>}>
            <span role="button" className="icon-container m-1" onClick={() => handleOpenModal(original)}>
              <IconifyIcon icon="la:clipboard-list" className="text-secondary fs-18 icon-hover" />
            </span>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={<Tooltip id="view-ticket-tooltip">Assigned</Tooltip>}>
            <span role="button" className="icon-container m-1" onClick={() => handleModal(original)}>
              <IconifyIcon icon="la:user-check" className="text-secondary fs-18 icon-hover" />
            </span>
          </OverlayTrigger>

          <span role="button" className="icon-container m-1" onClick={handleLeadStatus}>
            <IconifyIcon icon="la:pen" className="text-secondary fs-18 icon-hover" />
          </span>
        </div>

      ),
    },
  ];

  return (
    <div>
      <ReactTable<LeadType>
        columns={columns}
        data={lead}
     
        tableClass="mb-0 checkbox-all text-nowrap"
        theadClass="table-light"
        showPagination
      />

      {selectedLead && (
        <ViewActionListModal
          show={showModal}
          onClose={handleCloseModal}
          selectedId={selectedLead.id}
          leadData={selectedLead}
        />
      )}
    
        

      {assignLead && (
        <AssignedModal
          show={showAgentsModal}
          onClose={handleCloseModal}
          assignData={assignLead}
        />

      )}
 <LeadStatusUpdateModal
        show={showLeadStatusModal}
        onClose={handleCloseModal}
      />

    </div>

  );
};

export default LeadTable;
