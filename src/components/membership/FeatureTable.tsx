export default function FeatureTable() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">
                Features
              </th>
              <th className="p-4">Free</th>
              <th className="p-4">Premium</th>
              <th className="p-4">Enterprise</th>
            </tr>
          </thead>
  
          <tbody>
            <tr className="border-t">
              <td className="p-4">
                Funding Opportunities
              </td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
  
            <tr className="border-t">
              <td className="p-4">
                Proposal Tracking
              </td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
  
            <tr className="border-t">
              <td className="p-4">
                AI Recommendations
              </td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
              <td className="text-center">✅</td>
            </tr>
  
            <tr className="border-t">
              <td className="p-4">
                Analytics Dashboard
              </td>
              <td className="text-center">❌</td>
              <td className="text-center">❌</td>
              <td className="text-center">✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }