const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.

  return getNewToken(oAuth2Client, callback);

  //   fs.readFile(TOKEN_PATH, (err, token) => {
  //     if (err) return getNewToken(oAuth2Client, callback);
  //     oAuth2Client.setCredentials(JSON.parse(token));
  //     callback(oAuth2Client);
  //   });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  const subject = "180DC Interview Allocation";
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const user = {
    firstName: "Jimmy",
    lastName: "Brown",
    autoPassword: "passworddddd",
  };
  let html = `<p>Dear ${user.firstName} ${user.lastName},</p>
  <p>
    In order to access the interview allocation website please go to
    <a href="https://180dcusyd.org/">180dcusyd.org</a>.
  </p>
  <p>Please use the email you provided when applying to sign in to the website.</p>
  <p>Your password is ${user.autoPassword}</p>
  <p>Once signed in please change your password. This can be done through the home page or by going to <a href="https://180dcusyd.org/changepassword">180dcusyd.org/changepassword</a>.</p>
  <p>Kind regards,</p>
  <div dir="ltr" data-smartmail="gmail_signature">
    <div dir="ltr">
      <div>
        <div dir="ltr">
          <div>
            <div dir="ltr">
              <div>
                <div dir="ltr">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      color: rgb(0, 0, 0);
                      font-family: Avenir, Arial, sans-serif;
                      font-size: 1px;
                      line-height: 3px;
                      padding: 0px;
                      border-spacing: 0px;
                      margin: 0px;
                      border-collapse: collapse;
                    "
                  >
                    <tbody>
                      <tr>
                        <td
                          valign="middle"
                          style="line-height: 0px; padding-left: 11px"
                        >
                          <a
                            href="https://www.180dc.org"
                            target="_blank"
                            data-saferedirecturl="https://www.google.com/url?q=https://www.180dc.org&amp;source=gmail&amp;ust=1598794365665000&amp;usg=AFQjCNFpk9MLjsxtl7g7zxEwJbeK7U-Qow"
                            ><img
                              width="79"
                              height="85"
                              alt=""
                              border="0"
                              src="https://ci4.googleusercontent.com/proxy/2CDnGDD6rsOeWPTJrG64diquSzyhHGoExa0s60Ky1CkXnV5r5WfmUsVR5vTXY_oRpR7VDIgEJ7SzG66tN1zIIYE3VG7f-si3Qs-yBrgtlK5KTHNpT9x_t_Zgpc3vP8Q=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1fNMDISm0VBkCXYwjRmEDcCTJqPMI9eB6"
                              class="CToWUd"
                          /></a>
                        </td>
                        <td
                          width="11.0"
                          style="padding-right: 11px; width: 11px"
                        ></td>
                        <td
                          width="5.0"
                          style="
                            background-color: rgb(65, 64, 66);
                            width: 1.5px;
                          "
                        ></td>
                        <td
                          width="11.0"
                          style="padding-right: 11px; width: 11px"
                        ></td>
                        <td
                          valign="middle"
                          style="
                            font-size: 13px;
                            line-height: 15px;
                            color: rgb(65, 64, 66);
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                              font-family: Avenir, Arial, sans-serif;
                              line-height: 3px;
                              font-size: 1px;
                              padding: 0px;
                              border-spacing: 0px;
                              margin: 0px;
                              border-collapse: collapse;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="font-size: 13px; line-height: 15px"
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      font-family: Avenir, Arial, sans-serif;
                                      line-height: 3px;
                                      font-size: 1px;
                                      padding: 0px;
                                      border-spacing: 0px;
                                      margin: 0px;
                                      border-collapse: collapse;
                                    "
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            line-height: 15px;
                                            font-weight: bold;
                                            padding-bottom: 3px;
                                          "
                                        >
                                          <span
                                            style="
                                              font-family: Avenir, Arial,
                                                sans-serif;
                                              line-height: 12px;
                                            "
                                            ><font color="#73b744" size="2"
                                              >The Sydney University Executive
                                              team</font
                                            ></span
                                          ><font color="#888888"
                                            ><span
                                              style="
                                                color: rgb(65, 64, 66);
                                                font-size: 12px;
                                                font-family: Avenir, Arial,
                                                  sans-serif;
                                                line-height: 12px;
                                              "
                                              ><br /><span
                                                style="
                                                  font-family: Arial,
                                                    Helvetica, sans-serif;
                                                  line-height: 12px;
                                                  font-weight: normal;
                                                "
                                                ><font
                                                  face="Avenir, Arial, sans-serif"
                                                  ><span class="il">180</span>
                                                  <span class="il"
                                                    >Degrees</span
                                                  >
                                                  <span class="il"
                                                    >Consulting</span
                                                  >
                                                  University of Sydney</font
                                                ></span
                                              ></span
                                            ></font
                                          >
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    font-size: 13px;
                                    line-height: 1px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      font-family: Avenir, Arial, sans-serif;
                                      line-height: 3px;
                                      font-size: 1px;
                                      padding: 0px;
                                      border-spacing: 0px;
                                      margin-top: 0px;
                                      border-collapse: collapse;
                                    "
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style="
                                            font-size: 13px;
                                            line-height: 1px;
                                          "
                                        >
                                          <div
                                            style="
                                              float: left;
                                              padding-right: 10px;
                                            "
                                          >
                                            <span
                                              style="
                                                font-family: Avenir, Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                line-height: 10px;
                                              "
                                              ><a
                                                style="
                                                  display: inline;
                                                  white-space: nowrap;
                                                "
                                                ><img
                                                  width="18.5"
                                                  height="13.5"
                                                  alt=""
                                                  src="https://ci4.googleusercontent.com/proxy/gWeACvi4MyqTWCrrKlkTRCAr_85ss8IhJTvflVMpBJjh5Amjr0HsXqtf7Cl5ZGzYq3rxYaW0EzhB-k3CvGzFIlsOf5PH4n-Xsahx-j09-jVx5xlLrX_Gw-5a1FbJEuk=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1SMmyoEBkoqvtYkhybaPz3OY3BIAneRxc"
                                                  style="
                                                    border: none;
                                                    display: inline;
                                                    margin-top: 0px;
                                                    padding-right: 3px;
                                                  "
                                                  class="CToWUd" /></a
                                              >&nbsp;<a
                                                href="mailto:sydney@180dc.org"
                                                target="_blank"
                                                >sydney@180dc.org</a
                                              ></span
                                            >
                                          </div>
                                          <div
                                            style="
                                              float: left;
                                              padding-right: 10px;
                                            "
                                          >
                                            <a
                                              style="
                                                display: inline;
                                                white-space: nowrap;
                                              "
                                              ><img
                                                width="17"
                                                height="17"
                                                alt=""
                                                src="https://ci5.googleusercontent.com/proxy/IfZieg2HzCV5cjfEd8QLogBQlC0c5Cuh36b-pew0Us_Mh4DjFMafVV8feF3xiUm6R0eGxf8Dj4Yk39IQ5bHJRheUDWEPMMm1dWhRCq18Ji4aowwxyGeNZHG7I8lAy9w=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1Wxs3vbVGnF0R4IKXb9OKayFt7U9AmfkW"
                                                style="
                                                  border: none;
                                                  display: inline;
                                                  margin-top: 0px;
                                                  padding-right: 3px;
                                                "
                                                class="CToWUd" /></a
                                            >&nbsp;<span
                                              style="white-space: nowrap"
                                            ></span
                                            ><span
                                              style="
                                                font-family: Avenir, Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                line-height: 10px;
                                              "
                                              ><font
                                                face="Arial, Helvetica, sans-serif"
                                                ><a
                                                  href="https://www.180dc.org"
                                                  style="
                                                    color: rgb(65, 64, 66);
                                                  "
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=https://www.180dc.org&amp;source=gmail&amp;ust=1598794365666000&amp;usg=AFQjCNHhtP140SqwaDH1P5ScZQbYgx139Q"
                                                  >www.180dc.org</a
                                                ></font
                                              ></span
                                            >
                                          </div>
                                          <div
                                            style="
                                              float: left;
                                              padding-right: 10px;
                                            "
                                          >
                                            <a
                                              style="
                                                display: inline;
                                                white-space: nowrap;
                                              "
                                              ><img
                                                width="15"
                                                height="17"
                                                alt=""
                                                src="https://ci6.googleusercontent.com/proxy/_JRyNHXxJE9tNJuYy0ymG0A5RQdm0NK2nLS_fRhCgGhIfsTVWXENA6ujABF2XnKKtpD9RvErHnlwRlO66OwDKctnWW_PRYcCuPhV4XACAae0DmBVmHUVeJlLHpAvEs0=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1222WC992cZph5kJNuIke-zJZqLf5eP9P"
                                                style="
                                                  border: none;
                                                  display: inline;
                                                  margin-top: 0px;
                                                  padding-right: 3px;
                                                "
                                                class="CToWUd" /></a
                                            >&nbsp;<span
                                              span=""
                                              style="white-space: nowrap"
                                              ><span
                                                style="
                                                  font-family: Avenir, Arial,
                                                    sans-serif;
                                                  font-size: 12px;
                                                  line-height: 10px;
                                                "
                                                ><font
                                                  face="Arial, Helvetica, sans-serif"
                                                  >+61 450 9280 668</font
                                                ></span
                                              ></span
                                            >
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    padding-bottom: 1px;
                                    font-size: 15px;
                                    line-height: 15px;
                                  "
                                >
                                  <a
                                    href="https://www.facebook.com/180DegreesConsulting/"
                                    style="
                                      display: inline;
                                      white-space: nowrap;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/180DegreesConsulting/&amp;source=gmail&amp;ust=1598794365666000&amp;usg=AFQjCNEhWIkv6Ph6S3Q-DQyUrSJHfPQM4A"
                                    ><img
                                      width="20"
                                      height="20"
                                      alt=""
                                      src="https://ci5.googleusercontent.com/proxy/oOyxtI3klA8Jo75hOe1RImH_c1LXTQZ_OnCSV3NICmmXvAHwzkEfJNlan0Q62pY8TCrrPHSzofx6onzi36sTwfvNTO8M_phtPipEDITOVdmeRR7u_JnTN68C5nj9EPs=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1yduRYTf6WZT6F9a6wnBNjk12W4jBn7TR"
                                      style="
                                        margin-bottom: 2px;
                                        border: none;
                                        display: inline;
                                      "
                                      class="CToWUd" /></a
                                  >&nbsp;<span style="white-space: nowrap"
                                    ><img
                                      width="2"
                                      src="https://ci6.googleusercontent.com/proxy/k0L1CULEJfPp-Y4vLAi-mk0dAYHTX6HKJbHK3js9xDofY1csoNZRSxas4C9YaPofX-g-XjvwNg2Qwii3LZv9yL8SKUcrGROiuJNgPaE7VDJyzUUThF0-nQ_n418zZBY=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1nK8viGYDdSO8AxjQY8kKfKRpeCeCnVFZ"
                                      class="CToWUd"
                                    />&nbsp;</span
                                  ><a
                                    href="https://www.instagram.com/180degreesconsulting/"
                                    style="
                                      display: inline;
                                      white-space: nowrap;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/180degreesconsulting/&amp;source=gmail&amp;ust=1598794365666000&amp;usg=AFQjCNER6eB-ZqbzRkmObzyIdsiITO80Zw"
                                    ><img
                                      width="20"
                                      height="20"
                                      alt=""
                                      src="https://ci3.googleusercontent.com/proxy/B-Al0wPZqrSk6Cdc4vdmS5S90sRyFWsOUwSuSOOa3VC-XQ8nm7CYaBU0ul9ZzKJ_0VF6A-TZt1jlGse8ojRSytj0vQoBSMugLef5ITY1-OrEDapBXYnUtbU9jf22kn4=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1b-oPZRAs-8Kph6wQD7wH7A83HU7IPMZV"
                                      style="
                                        margin-bottom: 2px;
                                        border: none;
                                        display: inline;
                                      "
                                      class="CToWUd" /></a
                                  >&nbsp;<span style="white-space: nowrap"
                                    ><img
                                      width="2"
                                      src="https://ci6.googleusercontent.com/proxy/k0L1CULEJfPp-Y4vLAi-mk0dAYHTX6HKJbHK3js9xDofY1csoNZRSxas4C9YaPofX-g-XjvwNg2Qwii3LZv9yL8SKUcrGROiuJNgPaE7VDJyzUUThF0-nQ_n418zZBY=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1nK8viGYDdSO8AxjQY8kKfKRpeCeCnVFZ"
                                      class="CToWUd"
                                    />&nbsp;</span
                                  ><a
                                    href="https://twitter.com/180degrees"
                                    style="
                                      display: inline;
                                      white-space: nowrap;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/180degrees&amp;source=gmail&amp;ust=1598794365666000&amp;usg=AFQjCNEhTi3lEpReVwI7Odtt6rRzY7KuCg"
                                    ><img
                                      width="20"
                                      height="20"
                                      alt=""
                                      src="https://ci3.googleusercontent.com/proxy/mtcSDMvrXS9WjY-HsqVeS9Qh-ZxE-aZZdaV-Artp55Jgj56FroKU_sa3_Xd88W6flgbkRVwcsdunYM9HeVQQB5EXHA6R0zPODusC-GyHqK-FLKDa71FOyTGjd17WBbQ=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1kwjLHS2HysRV7JYBnyb7xssgLJfk6X-E"
                                      style="
                                        margin-bottom: 2px;
                                        border: none;
                                        display: inline;
                                      "
                                      class="CToWUd" /></a
                                  >&nbsp;<span style="white-space: nowrap"
                                    ><img
                                      width="2"
                                      src="https://ci6.googleusercontent.com/proxy/k0L1CULEJfPp-Y4vLAi-mk0dAYHTX6HKJbHK3js9xDofY1csoNZRSxas4C9YaPofX-g-XjvwNg2Qwii3LZv9yL8SKUcrGROiuJNgPaE7VDJyzUUThF0-nQ_n418zZBY=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1nK8viGYDdSO8AxjQY8kKfKRpeCeCnVFZ"
                                      class="CToWUd"
                                    />&nbsp;</span
                                  ><a
                                    href="https://au.linkedin.com/company/180-degrees-consulting"
                                    style="
                                      display: inline;
                                      white-space: nowrap;
                                    "
                                    target="_blank"
                                    data-saferedirecturl="https://www.google.com/url?q=https://au.linkedin.com/company/180-degrees-consulting&amp;source=gmail&amp;ust=1598794365666000&amp;usg=AFQjCNEb2gv9wn1llMMyRVU1iB8QfYCpGA"
                                    ><img
                                      width="20"
                                      height="20"
                                      alt=""
                                      src="https://ci5.googleusercontent.com/proxy/XgteFBx6foke_hwnE7agRssna0jVkjIZWMHeZmzkmKTXgOp0Cttxshi-AIvnwhfJ07-DL4RhAnGq-446p688iVnExTOgUfnmBh5VZFPA5Jk7fc5vIjeCsz_oeTYkwh4=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1NirLKNSyaexw52QEyNnNe_M9bhtiHsZ4"
                                      style="
                                        margin-bottom: 2px;
                                        border: none;
                                        display: inline;
                                      "
                                      class="CToWUd" /></a
                                  >&nbsp;<span style="white-space: nowrap"
                                    ><img
                                      width="2"
                                      src="https://ci6.googleusercontent.com/proxy/k0L1CULEJfPp-Y4vLAi-mk0dAYHTX6HKJbHK3js9xDofY1csoNZRSxas4C9YaPofX-g-XjvwNg2Qwii3LZv9yL8SKUcrGROiuJNgPaE7VDJyzUUThF0-nQ_n418zZBY=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1nK8viGYDdSO8AxjQY8kKfKRpeCeCnVFZ"
                                      class="CToWUd"
                                  /></span>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    font-size: 13px;
                                    line-height: 1px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                      font-family: Avenir, Arial, sans-serif;
                                      line-height: 3px;
                                      font-size: 1px;
                                      padding: 0px;
                                      border-spacing: 0px;
                                      margin-top: 0px;
                                      border-collapse: collapse;
                                    "
                                  >
                                    <tbody></tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  const messageParts = [
    "From: Cameron Choi <cameronjchoi@gmail.com.com>",
    "To: Cameron Choi <cameron.choi@fmaa.com.au>",
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    html,
  ];
  const message = messageParts.join("\n");

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
}
