// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract InvoiceContract is ReentrancyGuard {


    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    address payable owner;

    constructor() {
       owner = payable(msg.sender);
    }

    struct invoice {
        uint256 id;
        address from;
        address to;
        uint256 createDate;
        uint256 dueDate;
    }

    mapping(uint256 => invoice) private invoices;

     event InvoiceCreated(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint256 createDate,
        uint256 dueDate
    );

      function createInvoice(
        address _from,
        address _to,
        uint256 _createDate,
        uint256 _dueDate
    ) public payable nonReentrant {
        _itemIds.increment();
        uint256 invoiceId = _itemIds.current();

        invoices[invoiceId] = invoice(
            invoiceId,
            _from,
            _to,
            _createDate,
            _dueDate
        );

        emit InvoiceCreated(invoiceId, _from, _to, _createDate, _dueDate);
    }


   
    function getInvoice(uint256 invoiceId)
        public
        view
        returns (invoice memory)
    {
        return invoices[invoiceId];
    }

    function getInvoices(
    )
        public
        view
        returns (invoice[] memory)
    {
         uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;

        invoice[] memory items = new invoice[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
                uint256 currentId = invoices[i + 1].id;
                invoice storage currentInvoice = invoices[currentId];
                items[currentIndex] = currentInvoice;
                currentIndex += 1;
        }
        return items;

    }


    
}
