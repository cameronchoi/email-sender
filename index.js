const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "file");
  },
  filename: function (req, file, cb) {
    cb(null, "list.csv");
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", (req, res) => {
  const emailSender = req.headers.email.trim();
  const emailPassword = req.headers.password;
  console.log("--------_STOP-------------");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    let users = [];

    fs.createReadStream("./file/list.csv")
      .pipe(csv())
      .on("data", (row) => {
        const firstName = row["First Name"];
        const lastName = row["Last Name"];
        const autoPassword = row["Password"];
        const email = row["Email"];
        users.push({ firstName, lastName, autoPassword, email });
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        users.forEach((user, i) => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailSender,
              pass: emailPassword,
            },
          });

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

          var mailOptions = {
            from: emailSender,
            to: user.email,
            subject: "180DC Interview Allocation",
            html: html,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return res.status(500).json(error);
            } else {
              console.log("Email sent: " + info.response);
              console.log(i);
              console.log(users.length - 1);
              if (i === users.length - 1) {
                return res.status(200).json("Emails successfully sent");
              }
            }
          });
        });
      });
  });
});
