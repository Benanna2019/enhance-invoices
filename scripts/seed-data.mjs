import data from "@begin/data";

function asUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

const fromNow = (days) =>
  asUTC(new Date(asUTC(new Date()).getTime() + 1000 * 60 * 60 * 24 * days));

const customers = [
  {
    key: "cln5bhjdk000008maf56w8f79",
    created_at: new Date().toISOString(),
    name: "Santa Monica",
    email: "santa@monica.jk",
  },
  {
    key: "cln5bikgd000008l12juzel31",
    created_at: new Date().toISOString(),
    name: "Stankonia",
    email: "stan@konia.jk",
  },
  {
    key: "cln5birdu000108l14i1h8t97",
    created_at: new Date().toISOString(),
    name: "Ocean Avenue",
    email: "ocean@avenue.jk",
  },
  {
    key: "cln5bj3xp000208l12sphh87i",
    created_at: new Date().toISOString(),
    name: "Tubthumper",
    email: "tub@thumper.jk",
  },
  {
    key: "cln5bjafo000308l1ab22clb8",
    created_at: new Date().toISOString(),
    name: "Wide Open Spaces",
    email: "wideopen@spaces.jk",
  },
];

const invoices = [
  {
    key: "cln5bjjlv000408l11f89gei2",
    created_at: new Date().toISOString(),
    number: 1995,
    invoice_date: fromNow(-13).getTime(),
    due_date: fromNow(-1).getTime(),
    customer_id: "cln5bhjdk000008maf56w8f79",
  },
  {
    key: "cln5bjpql000508l1h7du9nbq",
    created_at: new Date().toISOString(),
    number: 2000,
    invoice_date: fromNow(-5).getTime(),
    due_date: fromNow(0).getTime(),
    customer_id: "cln5bikgd000008l12juzel31",
  },
  {
    key: "cln5bjxsy000608l18cwk5gpe",
    created_at: new Date().toISOString(),
    number: 2003,
    invoice_date: fromNow(-16).getTime(),
    due_date: fromNow(-3).getTime(),
    customer_id: "cln5birdu000108l14i1h8t97",
  },
  {
    key: "cln5bk5bt000708l11p84ds0j",
    created_at: new Date().toISOString(),
    number: 1997,
    invoice_date: fromNow(-2).getTime(),
    due_date: fromNow(10).getTime(),
    customer_id: "cln5bj3xp000208l12sphh87i",
  },
  {
    key: "cln5bkdac000808l1dr6gg0c9",
    created_at: new Date().toISOString(),
    number: 1998,
    invoice_date: fromNow(-4).getTime(),
    due_date: fromNow(8).getTime(),
    customer_id: "cln5bjafo000308l1ab22clb8",
  },
];

const lineItems = [
  {
    key: "cln5bklvn000908l15wuo1e19",
    created_at: new Date().toISOString(),
    description: "Cat Drawing",
    quantity: 1,
    unit_price: 10_800.34,
    invoice_id: "cln5bjjlv000408l11f89gei2",
  },
  {
    key: "cln5bkuf2000a08l1617f948v",
    created_at: new Date().toISOString(),
    description: "Robbin Drawing",
    quantity: 1,
    unit_price: 6_000.23,
    invoice_id: "cln5bjpql000508l1h7du9nbq",
  },
  {
    key: "cln5bl34l000b08l1fxrk0pex",
    created_at: new Date().toISOString(),
    description: "Squirrel Drawing",
    quantity: 2,
    unit_price: 2_000.98,
    invoice_id: "cln5bjpql000508l1h7du9nbq",
  },
  {
    key: "cln5blead000c08l1131ph58f",
    created_at: new Date().toISOString(),
    description: "Koala Drawing",
    quantity: 2,
    unit_price: 9_500.02,
    invoice_id: "cln5bjxsy000608l18cwk5gpe",
  },
  {
    key: "cln5blj4w000d08l125x72oyf",
    created_at: new Date().toISOString(),
    description: "Giraffe Drawing",
    quantity: 1,
    unit_price: 14_000.4,
    invoice_id: "cln5bk5bt000708l11p84ds0j",
  },
  {
    key: "cln5bloua000e08l13fg3bzak",
    created_at: new Date().toISOString(),
    description: "Elephant Drawing",
    quantity: 3,
    unit_price: 4_600.65,
    invoice_id: "cln5bkdac000808l1dr6gg0c9",
  },
];

const deposits = [
  {
    key: "cln5blxyc000f08l1csay9kc2",
    created_at: new Date().toISOString(),
    amount: 6_409.04,
    deposit_date: fromNow(-8).getTime(),
    note: "Will get the rest to you by the due date. Love the cat!",
    invoice_id: "cln5bjjlv000408l11f89gei2",
  },
  {
    key: "cln5bm2ew000g08l1hutgbtm4",
    created_at: new Date().toISOString(),
    amount: 2_000.98,
    deposit_date: fromNow(-2).getTime(),
    note: "Paying off the first squirrel drawing",
    invoice_id: "cln5bjpql000508l1h7du9nbq",
  },
  {
    key: "cln5bm75h000h08l1a0wihg8o",
    created_at: new Date().toISOString(),
    amount: 9_500.02,
    deposit_date: fromNow(-4).getTime(),
    note: "First Koala payment. Will pay the second soon.",
    invoice_id: "cln5bjxsy000608l18cwk5gpe",
  },
  {
    key: "cln5bmcqv000i08l115lka235",
    created_at: new Date().toISOString(),
    amount: 9_500.02,
    deposit_date: fromNow(-2).getTime(),
    note: "Final payment. Thanks a ton!",
    invoice_id: "cln5bjxsy000608l18cwk5gpe",
  },
  {
    key: "cln5bmgxi000j08l12fkg01ie",
    created_at: new Date().toISOString(),
    amount: 4_600.65,
    deposit_date: fromNow(-1).getTime(),
    note: "This elephant is amazing. Thanks!",
    invoice_id: "cln5bkdac000808l1dr6gg0c9",
  },
];

// line item keys can just be done in line, i don't need them for reference in a variable

// also need to create the date function and make it a string

// handle the user creating/login/sessions etc later

async function seed() {
  for (const customer of customers) {
    await data.set({ table: "customers", ...customer });
  }

  for (const invoice of invoices) {
    await data.set({ table: "invoices", ...invoice });
  }

  for (const lineItem of lineItems) {
    await data.set({ table: "lineItems", ...lineItem });
  }

  for (const deposit of deposits) {
    await data.set({ table: "deposits", ...deposit });
  }
}

seed();
