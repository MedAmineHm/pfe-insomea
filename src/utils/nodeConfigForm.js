import { find, pick } from "ramda";

export const getNodeConfigDefaultValues = (node, nodes) => {
  const values = node?.data?.values;

  let defaultValues = values;
  let additionalValues = {};
  let parentResourceGroup;
  let parentVnet;

  switch (node.type) {
    // ======================== LOCATION ===================
    case "LocationNode":
      return values ? values : {};

    // ================ Resource Group =====================
    case "ResourceGroupNode":
      if (node.parentId) {
        const parentLocation = find((n) => n.id === node.parentId)(nodes);
        additionalValues = { location: parentLocation.data.values.location };
      }
      return { ...defaultValues, ...additionalValues };

    // ======================== Vnet ===================
    case "VnetNode":
      parentResourceGroup = find((n) => n.id === node.parentId)(nodes);
      if (parentResourceGroup) {
        additionalValues = {
          resourceGroupName: parentResourceGroup.data.values.name,
        };
        const parentLocation = find(
          (n) => n.id === parentResourceGroup.parentId
        )(nodes);
        additionalValues = {
          ...additionalValues,
          location: parentLocation.data.values.location,
        };
      }
      return { ...defaultValues, ...additionalValues };

    // ======================== Subnet ===================
    case "SubnetNode":
      parentVnet = find((n) => n.id === node.parentId)(nodes);
      if (parentVnet) {
        additionalValues = {
          vnetName: parentVnet.data.values.name,
        };
        parentResourceGroup = find((n) => n.id === parentVnet.parentId)(nodes);
        if (parentResourceGroup) {
          additionalValues = {
            ...additionalValues,
            resourceGroupName: parentResourceGroup.data.values.name,
          };
        }
      }
      return { ...defaultValues, ...additionalValues };
  }
};

export const getNodeValues = (nodeDataValues, type) => {
  switch (type) {
    case "LocationNode":
      return pick(["location"], nodeDataValues);
    case "ResourceGroupNode":
      return pick(["name", "resourceName"], nodeDataValues);
    case "VnetNode":
      return pick(["resourceName", "addressSpace", "name"], nodeDataValues);
    case "SubnetNode":
      return pick(["resourceName", "addressSpace", "name"], nodeDataValues);
  }
};
