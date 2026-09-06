"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCopy,
  FiCheck,
  FiUploadCloud,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

interface WalletItem {
  _id: string;
  name: string;
  label: string;
  symbol: string;
  network?: string;
  walletAddress: string;
  qrCodeUrl: string;
  isActive: boolean;
  order?: number;
}

export default function AdminWalletsPage() {
  const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingWallet, setEditingWallet] = useState<WalletItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    label: "",
    symbol: "",
    network: "",
    walletAddress: "",
    qrCodeUrl: "",
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchWallets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/wallets");
      const data = await res.json();
      if (res.ok && Array.isArray(data.wallets)) {
        setWallets(data.wallets);
      }
    } catch (err) {
      console.error("Failed to load wallets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setFormData({
      label: "",
      symbol: "",
      network: "",
      walletAddress: "",
      qrCodeUrl: "",
      isActive: true,
    });
    setSelectedFile(null);
    setFilePreview(null);
    setStatusMessage(null);
    setShowAddModal(true);
  };

  const openEditModal = (wallet: WalletItem) => {
    setEditingWallet(wallet);
    setFormData({
      label: wallet.label,
      symbol: wallet.symbol,
      network: wallet.network || "",
      walletAddress: wallet.walletAddress,
      qrCodeUrl: wallet.qrCodeUrl,
      isActive: wallet.isActive,
    });
    setSelectedFile(null);
    setFilePreview(null);
    setStatusMessage(null);
  };

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.symbol || !formData.walletAddress) {
      setStatusMessage({
        type: "error",
        text: "Please provide Name/Label, Symbol, and Wallet Address.",
      });
      return;
    }

    if (!selectedFile && !formData.qrCodeUrl) {
      setStatusMessage({
        type: "error",
        text: "Please upload a QR Code image or enter an image URL.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const payload = new FormData();
      payload.append("label", formData.label);
      payload.append("symbol", formData.symbol);
      payload.append("network", formData.network);
      payload.append("walletAddress", formData.walletAddress);
      payload.append("isActive", String(formData.isActive));

      if (selectedFile) {
        payload.append("qrCodeFile", selectedFile);
      } else if (formData.qrCodeUrl) {
        payload.append("qrCodeUrl", formData.qrCodeUrl);
      }

      const res = await fetch("/api/wallets", {
        method: "POST",
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create deposit wallet.");
      }

      setShowAddModal(false);
      fetchWallets();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to create wallet.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWallet) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const payload = new FormData();
      payload.append("id", editingWallet._id);
      payload.append("label", formData.label);
      payload.append("symbol", formData.symbol);
      payload.append("network", formData.network);
      payload.append("walletAddress", formData.walletAddress);
      payload.append("isActive", String(formData.isActive));

      if (selectedFile) {
        payload.append("qrCodeFile", selectedFile);
      } else if (formData.qrCodeUrl) {
        payload.append("qrCodeUrl", formData.qrCodeUrl);
      }

      const res = await fetch("/api/wallets", {
        method: "PUT",
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update deposit wallet.");
      }

      setEditingWallet(null);
      fetchWallets();
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to update wallet.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWallet = async (wallet: WalletItem) => {
    if (
      !confirm(
        `Are you sure you want to delete the ${wallet.label} deposit option? This will also remove its QR code.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/wallets?id=${wallet._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete wallet.");
      }

      fetchWallets();
    } catch (err: any) {
      alert(err.message || "Failed to delete wallet.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
        <p className="text-gray-400">Loading deposit wallets...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 text-white min-h-screen max-[500px]:mt-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Deposit Wallets</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage deposit cryptocurrencies, update wallet addresses, and upload QR codes displayed to users.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-lime-400 hover:bg-lime-300 text-black font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-md shadow-lime-400/20"
        >
          <FiPlus className="text-lg" /> Add New Wallet
        </button>
      </div>

      {/* Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <div
            key={wallet._id}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-gray-700 transition shadow-lg"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {wallet.label}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded bg-lime-400/20 text-lime-400 font-semibold border border-lime-400/30">
                      {wallet.symbol}
                    </span>
                    {wallet.network && (
                      <span className="text-xs text-gray-400">
                        {wallet.network}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    wallet.isActive
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-gray-800 text-gray-400 border-gray-700"
                  }`}
                >
                  {wallet.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* QR Code Preview */}
              <div className="bg-black/60 border border-gray-800 rounded-xl p-3 flex justify-center items-center my-3 min-h-48">
                {wallet.qrCodeUrl ? (
                  <div className="relative w-40 h-40">
                    <Image
                      src={wallet.qrCodeUrl}
                      alt={wallet.label}
                      fill
                      className="object-contain rounded-lg"
                      unoptimized={wallet.qrCodeUrl.startsWith("http")}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-gray-500">No QR Code uploaded</div>
                )}
              </div>

              {/* Wallet Address & Copy */}
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">
                  Deposit Address
                </span>
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-2.5 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-gray-200 break-all select-all">
                    {wallet.walletAddress}
                  </span>
                  <button
                    onClick={() => handleCopy(wallet.walletAddress, wallet._id)}
                    className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-white rounded transition flex-shrink-0"
                    title="Copy Address"
                  >
                    {copiedId === wallet._id ? (
                      <FiCheck className="text-lime-400 text-base" />
                    ) : (
                      <FiCopy className="text-base" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(wallet)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-1.5 transition"
              >
                <FiEdit2 /> Edit
              </button>
              <button
                onClick={() => handleDeleteWallet(wallet)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 flex items-center gap-1.5 transition"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD WALLET MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Add Deposit Wallet</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === "error"
                    ? "bg-red-950/50 border border-red-500/40 text-red-200"
                    : "bg-emerald-950/50 border border-emerald-500/40 text-emerald-200"
                }`}
              >
                {statusMessage.type === "error" ? (
                  <FiAlertCircle className="text-lg flex-shrink-0" />
                ) : (
                  <FiCheckCircle className="text-lg flex-shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateWallet} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Display Label *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solana (SOL - Mainnet)"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Symbol *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SOL"
                    value={formData.symbol}
                    onChange={(e) =>
                      setFormData({ ...formData, symbol: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400 uppercase"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Network
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Solana / SPL"
                    value={formData.network}
                    onChange={(e) =>
                      setFormData({ ...formData, network: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Wallet Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7xKXtg2CW87d97TXJSDpH..."
                  value={formData.walletAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, walletAddress: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none font-mono focus:border-lime-400"
                />
              </div>

              {/* QR Code Upload */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  QR Code Image *
                </label>
                <div className="border-2 border-dashed border-gray-700 hover:border-lime-400 rounded-xl p-4 text-center cursor-pointer transition relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {filePreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-28 h-28">
                        <Image
                          src={filePreview}
                          alt="QR Preview"
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <span className="text-xs text-lime-400 font-medium">
                        Click to change image
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 py-2">
                      <FiUploadCloud className="text-3xl text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-300 font-medium">
                        Click to upload QR code image
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveAdd"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded w-4 h-4 accent-lime-400"
                />
                <label htmlFor="isActiveAdd" className="text-xs text-gray-300 cursor-pointer">
                  Wallet is active and available to users
                </label>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer transition shadow-md shadow-lime-400/20"
                >
                  {isSubmitting ? "Uploading & Creating..." : "Create Wallet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT WALLET MODAL */}
      {editingWallet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Edit Deposit Wallet</h3>
              <button
                onClick={() => setEditingWallet(null)}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {statusMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusMessage.type === "error"
                    ? "bg-red-950/50 border border-red-500/40 text-red-200"
                    : "bg-emerald-950/50 border border-emerald-500/40 text-emerald-200"
                }`}
              >
                {statusMessage.type === "error" ? (
                  <FiAlertCircle className="text-lg flex-shrink-0" />
                ) : (
                  <FiCheckCircle className="text-lg flex-shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateWallet} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Display Label
                </label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Symbol
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.symbol}
                    onChange={(e) =>
                      setFormData({ ...formData, symbol: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400 uppercase"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-300 block mb-1">
                    Network
                  </label>
                  <input
                    type="text"
                    value={formData.network}
                    onChange={(e) =>
                      setFormData({ ...formData, network: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  Wallet Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.walletAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, walletAddress: e.target.value })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm outline-none font-mono focus:border-lime-400"
                />
              </div>

              {/* QR Code Replacement */}
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">
                  QR Code Image
                </label>
                <div className="border-2 border-dashed border-gray-700 hover:border-lime-400 rounded-xl p-4 text-center cursor-pointer transition relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-28 h-28">
                      <Image
                        src={filePreview || formData.qrCodeUrl || "/images/btc-acct.jpg"}
                        alt="QR Code"
                        fill
                        className="object-contain rounded"
                        unoptimized={(filePreview || formData.qrCodeUrl).startsWith("http")}
                      />
                    </div>
                    <span className="text-xs text-lime-400 font-medium">
                      Click to upload new QR image
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveEdit"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="rounded w-4 h-4 accent-lime-400"
                />
                <label htmlFor="isActiveEdit" className="text-xs text-gray-300 cursor-pointer">
                  Wallet is active and available to users
                </label>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingWallet(null)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer transition shadow-md shadow-lime-400/20"
                >
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
