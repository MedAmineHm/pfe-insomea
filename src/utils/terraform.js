import { filter, forEach } from "ramda";

export const processBoardResources = (nodes = []) => {
  const locations = {};
  const resourceGroups = {};
  const vnets = {};
  const res = {};

  // process locations
  const locationsNodes = filter((node) => node.type === "LocationNode")(nodes);
  if (locationsNodes.length) {
    forEach((node) => (locations[node.id] = node.data.values))(locationsNodes);
  }

  // process resource groups
  const resourceGroupsNodes = filter(
    (node) => node.type === "ResourceGroupNode"
  )(nodes);

  if (resourceGroupsNodes.length) {
    forEach(
      (node) =>
        (resourceGroups[node.id] = {
          name: node.data.values.name,
          location: locations?.[node.parentId]?.location,
          resource_name: node.data.values.resourceName,
        })
    )(resourceGroupsNodes);
    res.resources = Object.values(resourceGroups);
  }

  // process vnets
  const vnetsNodes = filter((node) => node.type === "VnetNode")(nodes);
  if (vnetsNodes.length) {
    forEach(
      (node) =>
        (vnets[node.id] = {
          resource_name: node.data.values.resourceName,
          name: node.data.values.name,
          address_space: [node.data.values.addressSpace],
          location: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.location`,
          resource_group_name: `azurerm_resource_group.${
            resourceGroups?.[node.parentId]?.resource_name
          }.name`,
        })
    )(vnetsNodes);
    res.vnets = Object.values(vnets);
  }

  return res;
};
