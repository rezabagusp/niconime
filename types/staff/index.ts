export type Staff = {
  id: number,
  name: string,
};

export type StaffEdge = {
  node: Staff,
  id: number,
};

export type StaffConnection = {
  edges: StaffEdge[],
  nodes: Staff,
};
