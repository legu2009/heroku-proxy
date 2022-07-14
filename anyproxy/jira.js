function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

async function run() {
    const PAGES = 2;

    //const COMMENT = '';
    //const FIRST_URL = `/issues/?filter=19703&jql=project%20%3D%20SPM%20AND%20status%20%3D%20%22Waiting%20Confirm%22%20ORDER%20BY%20created%20ASC`;
    //const ACTION = 701;

    //const FIRST_URL =`/issues/?filter=19703&jql=project%20%3D%20SPM%20AND%20status%20%3D%20Open%20ORDER%20BY%20created%20ASC`;
    //const ACTION = 2;

    //const FIRST_URL =`/issues/?filter=19703&jql=project%20%3D%20SPM%20AND%20issuetype%20%3D%20Story%20AND%20status%20%3D%20Open%20ORDER%20BY%20created%20ASC`;
    //const ACTION = 181;

    //const FIRST_URL =`/issues/?filter=19703&jql=project%20%3D%20SPM%20AND%20issuetype%20%3D%20Story%20AND%20status%20%3D%20Coding%20ORDER%20BY%20created%20ASC`;
    //const ACTION = 161;

    const FIRST_URL = `/issues/?filter=19703&jql=project%20%3D%20SPM%20AND%20issuetype%20%3D%20Story%20AND%20status%20%3D%20Verifying%20ORDER%20BY%20created%20ASC`;
    const ACTION = 151;
    const COMMENT = "已完成";

    const RETURN_URL = `http://jira.gaiaworks.cn:8089` + FIRST_URL;
    for (var i = 0; i < PAGES; i++) {
        let response = await fetch(FIRST_URL);
        let body = await response.text();
        let dom = new DOMParser().parseFromString(body, "text/html");
        let issuerow = dom.querySelectorAll("#issuetable tbody .issuerow");
        for (let index = 0; index < issuerow.length; index++) {
            const time = issuerow[index].querySelector(".created time");
            if (time.getAttribute("datetime").substring(0, 4) * 1 >= 2022) continue;
            const url = new URL(issuerow[index].querySelector(".issue_actions a").href);
            const id = url.pathname.match(/\/issues\/(\d+)/)[1];
            const atl_token = url.searchParams.get("atl_token");
            try {
                let response = await fetch(
                    `/secure/CommentAssignIssue!default.jspa?action=${ACTION}&decorator=dialog&inline=true&atl_token=${atl_token}&id=${id}&_=${Math.random()}&returnUrl=${encodeURIComponent(
                        RETURN_URL
                    )}`
                );
                let body = await response.text();
                const dom = new DOMParser().parseFromString(body, "text/html");
                const formToken = dom.querySelector("[name=formToken]").value;
                const formData = new FormData();
                var obj = {
                    inline: true,
                    decorator: `dialog`,
                    action: ACTION,
                    id,
                    viewIssueKey: "",
                    formToken,
                    ["dnd-dropzone"]: "",
                    ["customfield_12036"]: "",
                    comment: COMMENT,
                    commentLevel: "",
                    returnUrl: RETURN_URL,
                    ["atl_token"]: atl_token,
                };
                for (var key in obj) {
                    formData.append(key, obj[key]);
                }
                response = await fetch(`/secure/CommentAssignIssue.jspa?atl_token=${atl_token}`, {
                    method: "POST",
                    body: formData,
                });
                await sleep(100);
            } catch (e) {
                console.log(e);
            }
        }
    }
    console.log("done");
}
run();
