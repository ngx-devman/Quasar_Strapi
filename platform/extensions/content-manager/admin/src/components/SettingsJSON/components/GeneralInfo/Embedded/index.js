import React from "react";
import { connect } from "react-redux";
import { Card, H3 } from "../Main/styles";
import styled from "styled-components";
const Select = styled.select`
  padding: 10px;
  height: 40px;
  font-size: 14px;
  border: 0;
  border-bottom: 2px solid #3498db;
  margin-bottom: 10px;`;
const Label = styled.label`
  font-size: 12px;
  font-weight: 500;`;
const Code = styled.div`
  background-color: #272822;
  border: 1px solid #272228;
  color: #f8f8f2;
  border-radius: 5px;
  padding: 10px;
  font-family: monospace;
  width: 100%`;
class Embedded extends React.Component {
  getId = (url) => url.substring(url.lastIndexOf('/')+1);
  getData = ({id = "", seriesId = "", customerId = ""} = {}) => {
    return { id, seriesId , customerId }
  };
  state = {
    data : {},
    platform: '',
  };
  componentDidMount() {
    this.setState(() => ({
      data: this.getData(this.props.value),
      platform : 'exp-engine'
    }))
  }
  onPlatformChange = () => {
    const platform = document.querySelector("#platform").value;
    this.setState(() => ({ platform }))
  };
  render() {
    let id = this.getId(window.location.pathname);
    return (
      <Card className="col-12 mt-5">
        <div className="p-0">
          <i className="fa fa-tags" />
          <H3>Watch & Shop Embed Instructions</H3>
          <Label htmlFor={"platform"}> Select Platform : </Label>
          <Select className={"form-control"} id={"platform"} onChange={this.onPlatformChange} value={this.state.platform}>
            <option value={'legacy-platform'}>Legacy Platform</option>
            <option value={'exp-engine'}>Experience Engine</option>
          </Select>
          <div>
            <p>To embed this video on your page, add the following script somewhere on your site (e.g. in
              header at end of body):</p>
            {this.state.platform === 'legacy-platform' &&
              <Code>&lt;script src="https://source-cdn.azureedge.net/shoppable/main.js"&gt; &lt;/script&gt;</Code>}
            {this.state.platform === 'exp-engine' &&
              <Code>&lt;script src="https://experience.sourcesync.io/js/embed.js"&gt;&lt;/script&gt;</Code>}
            <p> Copy and paste this embed code where you want the video to appear on your page: </p>
            {this.state.platform === 'legacy-platform' &&
              <Code>
              &lt;div <br />
                &nbsp;&nbsp;&nbsp;data-sd-experience="shop-able" <br />
                &nbsp;&nbsp;&nbsp;data-sd-production=`{this.state.data.id ? this.state.data.id : "production-id-here"}` <br />
                &nbsp;&nbsp;&nbsp;data-sd-account=`{this.state.data.customerId ? this.state.data.customerId : "account-id-here" }` <br />
                &nbsp;&nbsp;&nbsp;data-sd-timeline="default"&gt; <br />
              &lt;/div&gt; <br />
              </Code>}
            {this.state.platform === 'exp-engine' &&
              <Code>
              &lt;div <br />
                &nbsp;&nbsp;&nbsp;data-sd-experience="{ id }"&gt; <br />
              &lt;/div&gt; <br />
              </Code>}
          </div>
        </div>
      </Card>
    )
  }
}
const mapStateToProps = ({ value }) => ({ value })
export default connect(mapStateToProps)(Embedded);
