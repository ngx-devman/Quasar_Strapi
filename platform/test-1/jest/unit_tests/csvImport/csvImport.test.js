const services = require("../../../../api/import/controllers/Import");

let query, find, findOne, update;

query = jest.fn().mockReturnThis();

find = jest.fn().mockReturnValue({
  success: true,
});

findOne = jest.fn().mockReturnValue({
  data: [
    {
      production: "5e7a96342dc4b30c059644d0",
    },
  ],
});

update = jest.fn().mockReturnValue({});

global.strapi = {
  query,
  findOne,
  find,
  update,
};

describe("CsvImport Service", () => {
  test("Test Import Types", async () => {
    const response = await services.types({});

    expect(response.success).toBe(true);
  });

  test("Test Import", async () => {
    const response = await services.import({
      request: {
        body: [
          {
            "Original Title Sort": "HOME",
            EIDR: "F7C4-8D5B-4730-E105-33C8-B",
            OID: "5e7a96342dc4b30c059644d0",
            "Retail Price": "14.99",
            "Sale Price": "6.99",
            "Post Order Instructions":
              'Expiration Date: 7/1/2020\\n\\n\\n\\n**How to Redeem**\\n\\n* Go to the Movies Anywhere [redemption page] (http://moviesanywhere.com/redeem) and follow the steps\\n* Enter your redemption code\\n* Sign in or sign up for Movies Anywhere. Watch instantly!\\n* Questions about redemption? Contact [Movies Anywhere customer service] (https://help.moviesanywhere.com/hc/en-us/).\\n\\n**Terms & Conditions**\\n\\n* Cannot be used for previously placed orders. \\n* No refunds or exchanges for purchased redemption codes. \\n* Not transferable or for resale. No cash value or cash back. \\n* Cannot be combined with other Movies Anywhere codes or promotions. \\n* Redemption code good for one time use only.\\n* Valid redeemable on listed title or bundle only. \\n* Redemption code subject to expiration date. \\n* Offer includes main feature only; special features not included.\\n* High definition playback available on certain devices.\\n* Internet connection required.\\n* Download capability varies by device.\\n* Not compatible with all devices. Compatible devices subject to change. \\n* Redeemable only on Movies Anywhere. Active Movies Anywhere account required.\\n* Movies Anywhere is open to US residents age 13+. Visit MoviesAnywhere.com for complete details and Terms and Conditions. Other restrictions may apply."',
            "Offer Reason": "",
            "Original Display Title": "",
            "60 Display Title Medium": "",
            "60 Title Sort Medium": "",
            "19 Display Title Short": "",
            "19 Title Sort Short": "",
            SYSGEN: "",
            Studio: "Universal Pictures",
            "Country of Origin": "",
            "Digital Feature Version": "",
            Copyright:
              "?? 2015 DreamWorks Animation, L.L.C. All rights reserved.",
            Genres: "Action;Adventure;Animated;Comedy;Family;Science Fiction",
            Actors:
              "Jim Parsons, Rihanna, Steve Martin, Jennifer Lopez, Matt Jones, Brian Stepanek",
            Crew: "Tim Johnson (Director)",
            "Cleared for U.S. EST": "",
            "Cleared for U.S. VOD": "",
            "U.S. EST Solicitation Date": "",
            "U.S. EST Availability Date": "",
            "U.S. EST Expiration Date": "",
            "U.S. SD EST WSP": "",
            "U.S. HD EST WSP": "",
            "U.S. VOD Solicitation Date": "",
            "U.S. VOD Availability Date": "",
            "U.S. VOD Expiration Date": "",
            "U.S. VOD Type": "",
            "Cleared for CA EST": "",
            "Cleared for CA VOD": "",
            "CA EST Solicitation Date": "",
            "CA EST Availability Date": "",
            "CA EST Expiration Date": "",
            "CA SD EST WSP": "",
            "CA HD EST WSP": "",
            "CA VOD Solicitation Date": "",
            "CA VOD Availability Date": "",
            "CA VOD Expiration Date": "",
            "CA VOD Type": "",
            "EST Material #": "",
            "SD EST UPC": "",
            "SD VOD Material #": "",
            "SD VOD UPC": "",
            "HD EST Material #": "",
            "HD EST UPC": "",
            "HD VOD Material #": "",
            "HD VOD UPC": "",
            "APPLX Material #": "",
            "APPLX UPC": "",
            "TVD RSS Number": "",
            "Apple Vendor ID": "",
            "Released on UV / MA": "",
            "EIDR #": "",
            ALID: "",
            "UV Content ID": "",
            "MPAA Rating": "PG",
            "CARA Rating Reasons": "",
            "TV Parental Guidelines": "",
            "CHVRS Rating": "",
            "CHVRS Rating Reasons": "",
            "Quebec Regie Rating": "",
            "4000 Long Synopsis": "",
            "400 Medium Synopsis":
              "In the year???s hit comedy, a lovable misfit from another planet meets a girl named Tip. The two unlikely friends embark on the greatest journey of all time...the journey Home.",
            "190 Short Synopsis": "",
            "Mezz File Resolution": "",
            "Language / Audio": "",
            "Theatrical Aspect Ratio": "",
            "Digital Picture Format": "",
            "Digital Aspect Ratio": "",
            "Digital Subtitles": "",
            "Digital Run Time (Hours/Minutes)": "",
            "Digital Run Time (Minutes/Seconds)": "",
            "Digital Run Time (Minutes)": "93 Minutes ",
          },
        ],
      },
      params: {
        id: "1",
      },
    });

    expect(response.success).toBe(true);
    expect(response.createCount).toBe(0);
    expect(response.updateCount).toBe(1);
  });
});
