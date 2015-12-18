(function() {
  'use strict';

  angular
    .module('app.facility')
    .controller('FacilityController', FacilityController);

  /** @ngInject */

  function FacilityController() {
    var vm = this;

    activate();

    function activate() {

      fakeService();

    }

    //fake service that will be replaced by what mark is workign on
    function fakeService() {

      vm.facility = {
        "id": "77041VRCSH12950",
        "name": "NOV RIG SOLUTIONS WEST LITTLE YORK",
        "parentCompany": {
          "id": "161681044",
          "name": "NATIONAL OILWELL VARCO LP"
        },
        "address": {
          "streetAddress": "12950 W LITTLE YORK",
          "city": "HOUSTON",
          "county": "HARRIS",
          "state": "TX",
          "zipcode": "77041"
        },
        "biaCode": "",
        "tribeName": "",
        "latitude": "29.86307",
        "longitude": "-95.60604",
        "primaryNaics": "333132"
      };

      vm.reports = [{
        "documentControlNumber": 1313213154925,
        "formType": "R",
        "year": 2009,
        "facility": {
          "id": "77041VRCSH12950",
          "name": "NOV RIG SOLUTIONS WEST LITTLE YORK",
          "parentCompany": {
            "id": "77041VRCSH12950",
            "name": "NOV RIG SOLUTIONS WEST LITTLE YORK"
          },
          "address": {
            "streetAddress": "12950 W LITTLE YORK",
            "city": "HOUSTON",
            "county": "HARRIS",
            "state": "TX",
            "zipcode": "77041"
          },
          "biaCode": "",
          "tribeName": "",
          "latitude": "29.86307",
          "longitude": "-95.60604",
          "sicCodes": {
            "primary": 33312,
            "supplemental": [
              33312
            ]
          },
          "naicsCodes": {
            "primary": 33312,
            "supplemental": [
              33312
            ]
          }
        },
        "chemical": {
          "name": "BENZENE",
          "casNumber": "71-43-2",
          "isCleanAirActChemical": false,
          "classification": "TRI",
          "isMetal": true,
          "metalCategory": 1,
          "isCarcinogen": true
        },
        "unitOfMeasure": "Pounds",
        "quantitiesEnteringEnvironment": {
          "fugitiveAir": 235.6,
          "stackAir": 178.4,
          "water": 0,
          "undergroundClass1": 0,
          "undergroundClass2-5": 0,
          "rcraCLandfills": 0,
          "otherLandfills": 0,
          "landTreatment": 0,
          "surfaceImpoundment": 0,
          "rcraCSurfaceImpoundment": 0,
          "otherSurfaceImpoundment": 0,
          "otherDisposal": 0,
          "totals": {
            "onsiteReleaseTotal": 178.4
          }
        },
        "transfersToOffsiteLocations": {
          "potwTransfersForRelease": 0,
          "potwTransfersForTreatment": 0,
          "offsiteStorage": 0,
          "offsiteSolidificationStabilizationMetals": 0,
          "offsiteWastewaterTreatmentExcludePotw": 0,
          "offsiteUndergroundInjection": 0,
          "offsiteUndergroundInjectionClass1Wells": 0,
          "offsiteUndergroundInjectionClass2Wells": 0,
          "offsiteLandfill": 0,
          "offsiteSurfaceImpoundment": 0,
          "offsiteSubtitleCSurfaceImpoundment": 0,
          "offsiteOtherSurfaceImpoundment": 0,
          "offsiteOtherLandfills": 0,
          "offsiteRcraSubtitleCLandfill": 0,
          "offsiteLandTreatment": 0,
          "offsiteOtherLandDisposal": 0,
          "offsiteOtherOffsiteManagement": 0,
          "offsiteTransferToWasteBrokerDisposal": 0,
          "offsiteUnknown": 6387,
          "offsiteSolventsOrganicsRecovery": 0,
          "offsiteMetalsRecovery": 0,
          "offsiteOtherReuseRecovery": 0,
          "offsiteAcidRegeneration": 0,
          "offsiteTransferToWasteBrokerRecycling": 0,
          "offsiteEnergyRecovery": 0,
          "offsiteTransferToWasteBrokerEnergyRecovery": 0,
          "offsiteSolidicationStabilization": 0,
          "offsiteIncenerationThermalTreatment": 0,
          "offsiteIncenerationInsignificantFueldValue": 0,
          "offsiteWasteTreatmentExcludePotw": 0,
          "offsiteOtherWasteTreatment": 0,
          "offsiteTransferToWasteBrokerExcludeWasteTreatment": 0,
          "totals": {
            "potwTotalTransfers": 0,
            "offsiteReleaseTotal": 0,
            "offsiteRecycledTotal": 0,
            "offsiteRecoveryTotal": 0,
            "offsiteTreatedTotal": 6387
          }
        },
        "onsiteAndOffsiteTotalReleases": 0,
        "disposalSourceReductionRecycling": {
          "onsiteContainedReleases": 0,
          "onsiteOtherReleases": 178.4,
          "offsiteContainedReleases": 0,
          "offsiteOtherReleases": 6387,
          "onsiteEnergyRecovery": 0,
          "offsiteEnergyRecovery": 0,
          "onsiteRecycling": 0,
          "offsiteRecycling": 0,
          "onsiteTreatment": 0,
          "offsiteTreatment": 0,
          "oneTimeRelease": 0,
          "totals": {
            "totalReleases": 6565.4,
            "productionWaste": 6565.4
          }
        },
        "productionRatio": 1.31
      },
      {
        "documentControlNumber": 1313213154925,
        "formType": "R",
        "year": 2009,
        "facility": {
          "id": "77041VRCSH12950",
          "name": "NOV RIG SOLUTIONS WEST LITTLE YORK",
          "parentCompany": {
            "id": "77041VRCSH12950",
            "name": "NOV RIG SOLUTIONS WEST LITTLE YORK"
          },
          "address": {
            "streetAddress": "12950 W LITTLE YORK",
            "city": "HOUSTON",
            "county": "HARRIS",
            "state": "TX",
            "zipcode": "77041"
          },
          "biaCode": "",
          "tribeName": "",
          "latitude": "29.86307",
          "longitude": "-95.60604",
          "sicCodes": {
            "primary": 33312,
            "supplemental": [
              33312
            ]
          },
          "naicsCodes": {
            "primary": 33312,
            "supplemental": [
              33312
            ]
          }
        },
        "chemical": {
          "name": "ZINC COMPOUNDS",
          "casNumber": "N982",
          "isCleanAirActChemical": true,
          "classification": "TRI",
          "isMetal": true,
          "metalCategory": 1,
          "isCarcinogen": true
        },
        "unitOfMeasure": "Pounds",
        "quantitiesEnteringEnvironment": {
          "fugitiveAir": 0,
          "stackAir": 178.4,
          "water": 0,
          "undergroundClass1": 0,
          "undergroundClass2-5": 0,
          "rcraCLandfills": 0,
          "otherLandfills": 0,
          "landTreatment": 0,
          "surfaceImpoundment": 0,
          "rcraCSurfaceImpoundment": 0,
          "otherSurfaceImpoundment": 0,
          "otherDisposal": 0,
          "totals": {
            "onsiteReleaseTotal": 178.4
          }
        },
        "transfersToOffsiteLocations": {
          "potwTransfersForRelease": 0,
          "potwTransfersForTreatment": 0,
          "offsiteStorage": 0,
          "offsiteSolidificationStabilizationMetals": 0,
          "offsiteWastewaterTreatmentExcludePotw": 0,
          "offsiteUndergroundInjection": 0,
          "offsiteUndergroundInjectionClass1Wells": 0,
          "offsiteUndergroundInjectionClass2Wells": 0,
          "offsiteLandfill": 0,
          "offsiteSurfaceImpoundment": 0,
          "offsiteSubtitleCSurfaceImpoundment": 0,
          "offsiteOtherSurfaceImpoundment": 0,
          "offsiteOtherLandfills": 0,
          "offsiteRcraSubtitleCLandfill": 0,
          "offsiteLandTreatment": 0,
          "offsiteOtherLandDisposal": 0,
          "offsiteOtherOffsiteManagement": 0,
          "offsiteTransferToWasteBrokerDisposal": 0,
          "offsiteUnknown": 6387,
          "offsiteSolventsOrganicsRecovery": 0,
          "offsiteMetalsRecovery": 0,
          "offsiteOtherReuseRecovery": 0,
          "offsiteAcidRegeneration": 0,
          "offsiteTransferToWasteBrokerRecycling": 0,
          "offsiteEnergyRecovery": 0,
          "offsiteTransferToWasteBrokerEnergyRecovery": 0,
          "offsiteSolidicationStabilization": 0,
          "offsiteIncenerationThermalTreatment": 0,
          "offsiteIncenerationInsignificantFueldValue": 0,
          "offsiteWasteTreatmentExcludePotw": 0,
          "offsiteOtherWasteTreatment": 0,
          "offsiteTransferToWasteBrokerExcludeWasteTreatment": 0,
          "totals": {
            "potwTotalTransfers": 0,
            "offsiteReleaseTotal": 0,
            "offsiteRecycledTotal": 0,
            "offsiteRecoveryTotal": 0,
            "offsiteTreatedTotal": 6387
          }
        },
        "onsiteAndOffsiteTotalReleases": 0,
        "disposalSourceReductionRecycling": {
          "onsiteContainedReleases": 0,
          "onsiteOtherReleases": 178.4,
          "offsiteContainedReleases": 0,
          "offsiteOtherReleases": 6387,
          "onsiteEnergyRecovery": 0,
          "offsiteEnergyRecovery": 0,
          "onsiteRecycling": 0,
          "offsiteRecycling": 0,
          "onsiteTreatment": 0,
          "offsiteTreatment": 0,
          "oneTimeRelease": 0,
          "totals": {
            "totalReleases": 6565.4,
            "productionWaste": 6565.4
          }
        },
        "productionRatio": 1.31
      }];

    }

  }

})();
