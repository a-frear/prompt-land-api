function makeFollowersArray() {
  return [
    {
      id: 1,
      username: "harryp",
      followee: "a_dumbledore",
    },
    {
      id: 2,
      username: "hermione.granger",
      followee: "r.weasley",
    },
    {
      id: 3,
      username: "r.weasley",
      followee: "hermione.granger",
    },
  ];
}

const authToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdiTGYyQkNFZ29LLUhVOHkyMTBwRyJ9.eyJpc3MiOiJodHRwczovL2Rldi1sdWtuNXVnMi51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjAxODQzNWY5ZGJkMWEwMDY4ZjBjMDQ0IiwiYXVkIjpbImh0dHBzOi8vZXhwcmVzcy5leWUtc2l0ZSIsImh0dHBzOi8vZGV2LWx1a241dWcyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTIyMDM0MzMsImV4cCI6MTYxMjI4OTgzMywiYXpwIjoiaE1MOEVuOUYzS3dDTmpLQVlUYnFwajJNVFJCU1laOEsiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.unwZfBHeDLD97rLmpMcRdCATWzw_5NcB2lyR2y2YMhaz5Mj0cr9kd5RzHxs0fS6H-eMf10R8dIMyHTuoNxpC7riHhdH8d8VpWcU-F7LYbP2zFwDzpbI8voUNBQC4_qe-xrywfZuyJXDWpB1vtzL8tDR074-TVcxAmZpLvz9Z0jAI3mbkKLBXZ8zJe38zM7zR9yCDlmu55FwujMHNdmVVeRlWCU2inGctX_koZBlkTKAzmXhOUcHwEyiT-RR37Ee59TIUx-d1Z_-S68E49ekck11NJLvcrk-Ix1pxnm3f7lh5Bh3AgNh_iFbNYmvOOq54Nhz1CpjPTvN_Z3RJxSTotg";

module.exports = { makeFollowersArray, authToken };
