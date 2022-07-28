import { gql } from '@apollo/client'
import { client } from '../../lib/graphql';

const ROADMAP_AUTH_QUERY = gql`
    query {
        accessIndex(last: 100) {
            edges {
                node {
                    id
                }
            }
        }
    }
`

export default async function accessRoadmap(req: any, res: any) {
    const authResults = await client.query({
        query: ROADMAP_AUTH_QUERY,
        fetchPolicy: 'network-only'
    })
    const authEntries = authResults.data.accountIndex?.edges || {}
    console.log("authEntries:", authEntries)
    // Verify policy and return accessRoadmap
    return res.status(200).json();
}