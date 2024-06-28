// script.js

const { ipcRenderer } = require("electron");

// Navigation to invoice page
document.getElementById("viewInvoice")?.addEventListener("click", () => {
  ipcRenderer.send("navigate", "invoice.html");
});

// Navigation back to main page
document.getElementById("backToMain")?.addEventListener("click", () => {
  ipcRenderer.send("navigate", "index.html");
});

// Sample data for demo purposes
const sampleInvoiceData = {
  invoiceNumber: "INV-001",
  invoiceDate: "2024-06-27",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  items: [
    { itemID: "1001", itemName: "Product A", quantity: 2, price: 10 },
    { itemID: "1002", itemName: "Product B", quantity: 1, price: 20 },
    // Add more items as needed
  ],
};

// Function to generate and display the invoice
function generateInvoice() {
  document.getElementById("invoiceNumber").innerText =
    sampleInvoiceData.invoiceNumber;
  document.getElementById("invoiceDate").innerText =
    sampleInvoiceData.invoiceDate;
  document.getElementById("customerName").innerText =
    sampleInvoiceData.customer.name;
  document.getElementById("customerEmail").innerText =
    sampleInvoiceData.customer.email;
  document.getElementById("customerPhone").innerText =
    sampleInvoiceData.customer.phone;

  const invoiceItems = document.getElementById("invoiceItems");
  let totalAmount = 0;

  // Clear previous items if any
  invoiceItems.innerHTML = "";

  // Loop through items and append to table
  sampleInvoiceData.items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.itemID}</td>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.quantity * item.price}</td>
        `;
    invoiceItems.appendChild(row);
    totalAmount += item.quantity * item.price;
  });

  // Display total amount
  document.getElementById("totalAmount").innerText = totalAmount;
}

// Call generateInvoice function on page load (you can adjust this based on your app's flow)
if (window.location.pathname.endsWith("invoice.html")) {
  window.onload = generateInvoice;
}
