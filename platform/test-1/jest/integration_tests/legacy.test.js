const axios = require("axios");

let id = "";

describe("Legacy Service", () => {
  test("Create Legacy Service", async () => {
    const response = await axios.post("http://localhost:1337/legacies", {
      settings: {
        primaryGenre: null,
        seriesTitle: "Watch&Shop",
        brightcoveVideoId: null,
        MovieLabsOutOfMovieDataTypeNames: [],
        extendedData: {},
        color: "color",
        episodeNumber: null,
        numDataObjects: 4,
        seriesMainImageUrl: null,
        media: [],
        languageCode: null,
        numTimelineSegments: 4,
        originalTitle: null,
        copyright: null,
        canPublishToWhisper: true,
        dotStudioProVideoId: null,
        editionName: null,
        customerName: "Verte Luxe",
        mediaSourceFps: 29.97,
        liveAirDate: null,
        providerId: null,
        mainImageUrl:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bcddd.png",
        externalIds: [],
        secondaryGenre: null,
        mediaSourceBrightcovePlayerId: null,
        facebookVideoId: null,
        isLiveType: false,
        vimeoVideoId: null,
        eidr: null,
        seriesId: "5dba0c319c61e4416ceb42a0",
        mediaSourceAspectRatioWidth: 16,
        brightcoveAccountId: null,
        youTubeVideoId: null,
        synopsis: "",
        duration: "00:00:00",
        mediaSourceLocation:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/46c27bb0-0e61-4fb0-b80c-571b55c9815d.mp4",
        contentId: null,
        releaseDate: null,
        seasonTitle: null,
        billingId: "1189518",
        durationSecs: 0,
        mediaSourceVideoId: null,
        isan: null,
        title: "Charity Challenge 18 - Archery Off",
        closedCaptions: false,
        mediaSourceType: "http",
        customerId: "5bb29d21d5041326f8d4b7c8",
        mediaSourceStartingTimeCode: null,
        publishedToWhisper: false,
        type: "webisode",
        id: "5dba0c319c61e4416ceb429f",
        mediaSourceAspectRatioHeight: 9,
        releaseCountryCode: null,
        publisher: null,
        description: null,
        mediaSourceAspectRatioHeightFraction: 0.5625,
        unusedDataTypeIds: [],
        html5VideoUrl:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5d810780ad0d970a74058966/4b85d848-8b36-43a9-aecc-673def9ca786.mp4",
        seasonId: null,
        distributionId: ""
      },
      data: [
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 280699,
              fileName:
                "BRCC_Gear_Mug_Coffee_or_Die_01_grande_00d7cf1d-3b91-4f82-9f81-7fa6a664709f.png",
              name:
                "BRCC_Gear_Mug_Coffee_or_Die_01_grande_00d7cf1d-3b91-4f82-9f81-7fa6a664709f.png",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bc.png",
              contentType: "image/png",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5d9b59e19c61e41584b47c95"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            name: '"Coffee or Die" Big Ass Mug',
            description:
              "<p>When big is what you aim for, set the Coffee, or Die Big Ass Mug in your sights. Holding 20 ounces of the best brewed beverage in CONUS, the COD BAM will ensure you're properly fueled for training at the range, at the gym, or taking on another day at the office — all while showing your love for BRCC and America.</p><p>Dimensions: 4.5 inches (height), 4 inches (diameter), 25 ounces (weight, empty)</p><p>Dishwasher safe </p>",
            basePrice: 0.99,
            externalProductId: "4231094042706",
            buttonText: "",
            externalCatalog: "verteluxe"
          },
          name: '"Coffee or Die" Big Ass Mug',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bc.png",
          timelineText: '"Coffee or Die" Big Ass Mug',
          dataTypeName: "product",
          cpc: null,
          id: "5d8ce21ead0d970a746af452",
          description: "",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 19191,
              fileName: "ECHO CERAMIC MUG.jpg",
              name: "ECHO CERAMIC MUG.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/23b80d42-09e7-4344-b206-5430288292d2.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a8"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, Or Die" Echo Ceramic Mug',
            bodyHtml:
              "<p>This classic ceramic mug fits in your hand like it was always meant to be there.</p> <p>Holds 14 ounces of your freshly brewed Freedom!</p> <p>We recommend hand-washing this item.</p>",
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              "This classic ceramic mug fits in your hand like it was always meant to be there.\n.\nHolds 14 ounces of your freshly brewed Freedom!\n.\nWe recommend hand-washing this item.",
            externalProductId: "4231094632530"
          },
          name: '"Coffee, Or Die" Echo Ceramic Mug',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/23b80d42-09e7-4344-b206-5430288292d2.jpg",
          timelineText: '"Coffee, Or Die" Echo Ceramic Mug',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c339c61e4416ceb42a7",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 20101,
              fileName: "180507_BREWER_CHEMEX_01_large.jpg",
              name: "180507_BREWER_CHEMEX_01_large.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/a62290cb-f617-4315-9a28-b3b0c3fd1413.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a6"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
            bodyHtml:
              '<p>At BRCC, we strive to make each cup as dangerously perfect as we can. That\'s why we\'re excited to bring you the "Coffee, or Die" Six-Cup Classic CHEMEX Coffee Maker.</p> <p>Invented in 1941, The CHEMEX has never needed to be altered or improved upon. Winning awards in both the design and science communities and being kept in the permanent collection of some of the most prestigious museums in the world are just a couple of pieces of its iconic history. Widely considered to be one of the best ways to brew the perfect cup of coffee; the CHEMEX has been the choice of coffee lovers globally for over 75 years and counting.<br><br>-Made of non-porous glass, so it won\'t absorb odors or chemicals<br>-Allows coffee to be covered and refrigerated for reheating without losing flavor<br>-Simple, easy to use with a timeless and elegant design<br>-Includes a leather-tied polished wood collar with the iconic "Coffee, or Die" Logo <br>-Uses CHEMEX® Bonded Filters FP-1, FC-100, FS-100, FSU-100<br><br>Capacity: 30 oz.<br>Dimensions: 8 1/2" H X 5 1/8" W</p> <p> </p> <p> </p> <iframe width="560" height="315" src="https://www.youtube.com/embed/zTLImEH0BMs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>',
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              'At BRCC, we strive to make each cup as dangerously perfect as we can. That\'s why we\'re excited to bring you the "Coffee, or Die" Six-Cup Classic CHEMEX Coffee Maker.\n.\nInvented in 1941, The CHEMEX has never needed to be altered or improved upon. Winning awards in both the design and science communities and being kept in the permanent collection of some of the most prestigious museums in the world are just a couple of pieces of its iconic history. Widely considered to be one of the best ways to brew the perfect cup of coffee; the CHEMEX has been the choice of coffee lovers globally for over 75 years and counting.\n.\n-Made of non-porous glass, so it won\'t absorb odors or chemicals\n-Allows coffee to be covered and refrigerated for reheating without losing flavor\n-Simple, easy to use with a timeless and elegant design\n-Includes a leather-tied polished wood collar with the iconic "Coffee, or Die" Logo\n-Uses CHEMEX® Bonded Filters FP-1, FC-100, FS-100, FSU-100\n.\nCapacity: 30 oz.\nDimensions: 8 1/2" H X 5 1/8" W',
            externalProductId: "4231095222354"
          },
          name: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/a62290cb-f617-4315-9a28-b3b0c3fd1413.jpg",
          timelineText: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c339c61e4416ceb42a5",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 14708,
              fileName: "airtight_CODside_gry_large.jpg",
              name: "airtight_CODside_gry_large.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/2e9d38af-1894-4ab4-8011-e8d7cc845198.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a4"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, or Die" Airtight Container - White Logo',
            bodyHtml:
              '<meta charset="utf-8"> <p><span>Shot groups are like coffee. Keep \'em tight!</span></p> <p><span>The truth is c</span><span>offee beans are actually best kept at room temperature in an airtight container.</span></p> <p><span>Contains plunger to push out air down to current bean level. The lid seals airtight. Holds 20 ounces of beans, grounds, flour, sugar, bullets, or whatever you want to keep fresh.</span></p> <p><span>6.5" tall x 5" wide (diameter)</span></p>',
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              'Shot groups are like coffee. Keep \'em tight!\n\nThe truth is coffee beans are actually best kept at room temperature in an airtight container.\n.\nIt contains a plunger to push out air down to the current bean level. The lid seals airtight. Holds 20 oz. of beans, grounds, flour, sugar, bullets, or whatever you want to keep fresh.\n.\n6.5" tall x 5" wide (diameter)',
            externalProductId: "4231094304850"
          },
          name: '"Coffee, or Die" Airtight Container - White Logo',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/2e9d38af-1894-4ab4-8011-e8d7cc845198.jpg",
          timelineText: '"Coffee, or Die" Airtight Container - White Logo',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c329c61e4416ceb42a3",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        }
      ],
      authKey: "platform-legacy"
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.id).not.toBeNull();

    id = response.data.data.id;
  });

  test("Update Legacy Service", async () => {
    const response = await axios.post("http://localhost:1337/legacies", {
      settings: {
        primaryGenre: null,
        seriesTitle: "Watch&Shop",
        brightcoveVideoId: null,
        MovieLabsOutOfMovieDataTypeNames: [],
        extendedData: {},
        color: "color",
        episodeNumber: null,
        numDataObjects: 4,
        seriesMainImageUrl: null,
        media: [],
        languageCode: null,
        numTimelineSegments: 4,
        originalTitle: null,
        copyright: null,
        canPublishToWhisper: true,
        dotStudioProVideoId: null,
        editionName: null,
        customerName: "Verte Luxe",
        mediaSourceFps: 29.97,
        liveAirDate: null,
        providerId: null,
        mainImageUrl:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bcddd.png",
        externalIds: [],
        secondaryGenre: null,
        mediaSourceBrightcovePlayerId: null,
        facebookVideoId: null,
        isLiveType: false,
        vimeoVideoId: null,
        eidr: null,
        seriesId: "5dba0c319c61e4416ceb42a0",
        mediaSourceAspectRatioWidth: 16,
        brightcoveAccountId: null,
        youTubeVideoId: null,
        synopsis: "",
        duration: "00:00:00",
        mediaSourceLocation:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/46c27bb0-0e61-4fb0-b80c-571b55c9815d.mp4",
        contentId: null,
        releaseDate: null,
        seasonTitle: null,
        billingId: "1189518",
        durationSecs: 0,
        mediaSourceVideoId: null,
        isan: null,
        title: "Charity Challenge 18 - Archery Off",
        closedCaptions: false,
        mediaSourceType: "http",
        customerId: "5bb29d21d5041326f8d4b7c8",
        mediaSourceStartingTimeCode: null,
        publishedToWhisper: false,
        type: "webisode",
        id: "5dba0c319c61e4416ceb429f",
        mediaSourceAspectRatioHeight: 9,
        releaseCountryCode: null,
        publisher: null,
        description: null,
        mediaSourceAspectRatioHeightFraction: 0.5625,
        unusedDataTypeIds: [],
        html5VideoUrl:
          "https://sourcecentralstorage.blob.core.windows.net/customer-5d810780ad0d970a74058966/4b85d848-8b36-43a9-aecc-673def9ca786.mp4",
        seasonId: null,
        distributionId: id
      },
      data: [
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 280699,
              fileName:
                "BRCC_Gear_Mug_Coffee_or_Die_01_grande_00d7cf1d-3b91-4f82-9f81-7fa6a664709f.png",
              name:
                "BRCC_Gear_Mug_Coffee_or_Die_01_grande_00d7cf1d-3b91-4f82-9f81-7fa6a664709f.png",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bc.png",
              contentType: "image/png",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5d9b59e19c61e41584b47c95"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            name: '"Coffee or Die" Big Ass Mug',
            description:
              "<p>When big is what you aim for, set the Coffee, or Die Big Ass Mug in your sights. Holding 20 ounces of the best brewed beverage in CONUS, the COD BAM will ensure you're properly fueled for training at the range, at the gym, or taking on another day at the office — all while showing your love for BRCC and America.</p><p>Dimensions: 4.5 inches (height), 4 inches (diameter), 25 ounces (weight, empty)</p><p>Dishwasher safe </p>",
            basePrice: 0.99,
            externalProductId: "4231094042706",
            buttonText: "",
            externalCatalog: "verteluxe"
          },
          name: '"Coffee or Die" Big Ass Mug',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/f3129fdf-d51c-45ec-a400-7f7f5f2651bc.png",
          timelineText: '"Coffee or Die" Big Ass Mug',
          dataTypeName: "product",
          cpc: null,
          id: "5d8ce21ead0d970a746af452",
          description: "",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 19191,
              fileName: "ECHO CERAMIC MUG.jpg",
              name: "ECHO CERAMIC MUG.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/23b80d42-09e7-4344-b206-5430288292d2.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a8"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, Or Die" Echo Ceramic Mug',
            bodyHtml:
              "<p>This classic ceramic mug fits in your hand like it was always meant to be there.</p> <p>Holds 14 ounces of your freshly brewed Freedom!</p> <p>We recommend hand-washing this item.</p>",
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              "This classic ceramic mug fits in your hand like it was always meant to be there.\n.\nHolds 14 ounces of your freshly brewed Freedom!\n.\nWe recommend hand-washing this item.",
            externalProductId: "4231094632530"
          },
          name: '"Coffee, Or Die" Echo Ceramic Mug',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/23b80d42-09e7-4344-b206-5430288292d2.jpg",
          timelineText: '"Coffee, Or Die" Echo Ceramic Mug',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c339c61e4416ceb42a7",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 20101,
              fileName: "180507_BREWER_CHEMEX_01_large.jpg",
              name: "180507_BREWER_CHEMEX_01_large.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/a62290cb-f617-4315-9a28-b3b0c3fd1413.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a6"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
            bodyHtml:
              '<p>At BRCC, we strive to make each cup as dangerously perfect as we can. That\'s why we\'re excited to bring you the "Coffee, or Die" Six-Cup Classic CHEMEX Coffee Maker.</p> <p>Invented in 1941, The CHEMEX has never needed to be altered or improved upon. Winning awards in both the design and science communities and being kept in the permanent collection of some of the most prestigious museums in the world are just a couple of pieces of its iconic history. Widely considered to be one of the best ways to brew the perfect cup of coffee; the CHEMEX has been the choice of coffee lovers globally for over 75 years and counting.<br><br>-Made of non-porous glass, so it won\'t absorb odors or chemicals<br>-Allows coffee to be covered and refrigerated for reheating without losing flavor<br>-Simple, easy to use with a timeless and elegant design<br>-Includes a leather-tied polished wood collar with the iconic "Coffee, or Die" Logo <br>-Uses CHEMEX® Bonded Filters FP-1, FC-100, FS-100, FSU-100<br><br>Capacity: 30 oz.<br>Dimensions: 8 1/2" H X 5 1/8" W</p> <p> </p> <p> </p> <iframe width="560" height="315" src="https://www.youtube.com/embed/zTLImEH0BMs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>',
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              'At BRCC, we strive to make each cup as dangerously perfect as we can. That\'s why we\'re excited to bring you the "Coffee, or Die" Six-Cup Classic CHEMEX Coffee Maker.\n.\nInvented in 1941, The CHEMEX has never needed to be altered or improved upon. Winning awards in both the design and science communities and being kept in the permanent collection of some of the most prestigious museums in the world are just a couple of pieces of its iconic history. Widely considered to be one of the best ways to brew the perfect cup of coffee; the CHEMEX has been the choice of coffee lovers globally for over 75 years and counting.\n.\n-Made of non-porous glass, so it won\'t absorb odors or chemicals\n-Allows coffee to be covered and refrigerated for reheating without losing flavor\n-Simple, easy to use with a timeless and elegant design\n-Includes a leather-tied polished wood collar with the iconic "Coffee, or Die" Logo\n-Uses CHEMEX® Bonded Filters FP-1, FC-100, FS-100, FSU-100\n.\nCapacity: 30 oz.\nDimensions: 8 1/2" H X 5 1/8" W',
            externalProductId: "4231095222354"
          },
          name: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/a62290cb-f617-4315-9a28-b3b0c3fd1413.jpg",
          timelineText: '"Coffee, Or Die" Six-Cup Classic Chemex® Coffee Maker',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c339c61e4416ceb42a5",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        },
        {
          cpm: null,
          productSuggestions: {
            specificProducts: [],
            enabledMarketplaceIds: [],
            keywords: null
          },
          defaultBrandId: null,
          dataType: "multipleObjects",
          media: [
            {
              sizeInBytes: 14708,
              fileName: "airtight_CODside_gry_large.jpg",
              name: "airtight_CODside_gry_large.jpg",
              url:
                "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/2e9d38af-1894-4ab4-8011-e8d7cc845198.jpg",
              contentType: "image/jpeg",
              alternateSizes: [],
              isMainImage: true,
              type: "image",
              id: "5dba0c339c61e4416ceb42a4"
            }
          ],
          modalExtensionIconType: null,
          dataTypeDisplayName: "Products",
          data: {
            itemCode: "",
            name: '"Coffee, or Die" Airtight Container - White Logo',
            bodyHtml:
              '<meta charset="utf-8"> <p><span>Shot groups are like coffee. Keep \'em tight!</span></p> <p><span>The truth is c</span><span>offee beans are actually best kept at room temperature in an airtight container.</span></p> <p><span>Contains plunger to push out air down to current bean level. The lid seals airtight. Holds 20 ounces of beans, grounds, flour, sugar, bullets, or whatever you want to keep fresh.</span></p> <p><span>6.5" tall x 5" wide (diameter)</span></p>',
            externalCatalog: "verteluxe",
            brandName: "Black Rifle Coffee Company",
            lowestPrice: 0.99,
            basePrice: 0.99,
            description:
              'Shot groups are like coffee. Keep \'em tight!\n\nThe truth is coffee beans are actually best kept at room temperature in an airtight container.\n.\nIt contains a plunger to push out air down to the current bean level. The lid seals airtight. Holds 20 oz. of beans, grounds, flour, sugar, bullets, or whatever you want to keep fresh.\n.\n6.5" tall x 5" wide (diameter)',
            externalProductId: "4231094304850"
          },
          name: '"Coffee, or Die" Airtight Container - White Logo',
          mainImageUrl:
            "https://sourcecentralstorage.blob.core.windows.net/customer-5bb29d21d5041326f8d4b7c8/2e9d38af-1894-4ab4-8011-e8d7cc845198.jpg",
          timelineText: '"Coffee, or Die" Airtight Container - White Logo',
          dataTypeName: "product",
          cpc: null,
          id: "5dba0c329c61e4416ceb42a3",
          description: "Black Rifle Coffee Company",
          dataTypeId: "5bb29d21d5041326f8d4b7d9"
        }
      ],
      authKey: "platform-legacy"
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.settings).not.toBeNull();
    expect(response.data.data.settings.distributionId).not.toBeNull();
    expect(response.data.data.name).toEqual(response.data.data.settings.title);
  });
});
