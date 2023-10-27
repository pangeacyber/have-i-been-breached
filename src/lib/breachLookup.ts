/* eslint-disable no-console */

import { PangeaConfig, UserIntelService, IPIntelService, AuditService, PangeaErrors } from "pangea-node-sdk";

const domain = process.env.PANGEA_DOMAIN;
const token = process.env.PANGEA_SERVICE_TOKEN;
const config = new PangeaConfig({ domain: domain });
const userIntel = new UserIntelService(String(token), config);
const ipIntel = new IPIntelService(String(token), config);
const audit = new AuditService(String(token), config);

const PangeaUserLookup = async (email: string) => {
  console.log("Checking user breached by email...");

  const request = { email: email, verbose: false, raw: true };
  try {
    const response = await userIntel.userBreached(request);
    // console.log("Result: ", response.result.data);
    // console.log("Raw: ", response.result.raw_data);
    return response.result
  } catch (e) {
    if (e instanceof PangeaErrors.APIError) {
      console.log("Error", e.summary, e.errors);
    } else {
      console.log("Error: ", e);
    }
  }
};

const PangeaIPGeolocate = async (ip_address: string) => {
  console.log("Geolocate IP...");

  const options = { provider: "digitalelement", verbose: true, raw: true };
  try {
    const response = await ipIntel.geolocate(ip_address, options);
    console.log("Result: ", response.result.data);

    return response.result.data
  } catch (e) {
    if (e instanceof PangeaErrors.APIError) {
      console.log("Error", e.summary, e.errors);
    } else {
      console.log("Error: ", e);
    }
  }

}

const PangeaVPNCheck = async (ip: string) => {
    console.log("Checking IP is a VPN...");

    const options = { provider: "digitalelement", verbose: false, raw: true };
    try {
      const response = await ipIntel.isVPN(ip, options);
      if (response.result.data.is_vpn === true) {
        console.log("IP is a VPN");
        return true;
      } else {
        console.log("IP is not a VPN");
        return false;
      }
    } catch (e) {
      if (e instanceof PangeaErrors.APIError) {
        console.log("Error", e.summary, e.errors);
      } else {
        console.log("Error: ", e);
      }
    }
}

const PangeaLogEmail = (async (email: string) => {
  
    const data = {
      email: email,
      conference_id: "ijs23"
    };
  
    try {
      const logResponse = await audit.log(data, { verbose: true });
      console.log("Response: %s", logResponse.result);
      return logResponse.result
    } catch (err) {
      if (err instanceof PangeaErrors.APIError) {
        console.log(err.summary, err.pangeaResponse);
        return false;
      } else {
        throw err;
      }
    }
})

export { PangeaUserLookup, PangeaIPGeolocate, PangeaVPNCheck, PangeaLogEmail };