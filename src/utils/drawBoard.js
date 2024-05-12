export const getNodeInitValues = (nodeType) => {
  switch (nodeType) {
    case "LocationNode":
      return {
        location: "East US",
      };
    case "ResourceGroupNode":
      return {
        name: "Resource",
        resourceName: "resource-group1",
        location: "East US",
      };
    case "VnetNode":
      return {
        resourceName: "virtual_network",
        addressSpace: "10.0.0.0/16",
        location: "East US",
        name: "vnet-kube",
        resourceGroupName: "resource_group1",
      };
    case "SubnetNode":
      return {
        resourceName: "virtual_network",
        addressPrefixes: "10.0.2.0/24",
        location: "East US",
        name: "vnet-kube",
        resourceGroupName: "resource_group1",
      };
    case "DiscNode":
      return {
        location: "East US",
        name: "Disk",
        maxDataDiskCount: "",
        memoryInMB: "",
        numberOfCores: "",
        osDiskSizeInMB: "",
        resourceDiskSizeInMB: "",
      };
    case "NsgNode":
      return {
        name: "Network security group",
        resourceGroupName: "resource_group1",
        location: "East US",
      };
    case "PublicIpNode":
      return {
        name: "Public Ip",
        resourceGroupName: "resource_group1",
        location: "East US",
        allocationMethod: "",
      };
    case "VmNode":
      return {
        name: "Virtual Machine",
        resourceGroupName: "resource_group1",
        location: "East US",
      };
    default:
      return {
        name: "",
      };
  }
};
